if ! git diff-index --quiet HEAD --; then
  echo ""
  echo "You have uncommitted changes, please commit them before continuing"
  echo ""
  echo "operation aborted"
  echo ""
  exit 0
fi

version="$1"

newTag="$1"

echo  "Fetching tags ..."
git fetch --tags

lastTag=`git tag | grep -E '^v\d+.+-no-protobuf$' | sort -t . -k 2 -g | tail -1`
if [ -z "$lastTag" ]; then
  newTag="v0.1-no-protobuf"
  echo "No previous tag found, using default: $newTag"
else
  if [ "$version" = "patch" ]; then
    echo "Patch release"
    # for example v0.1
    version1=`echo $lastTag | grep -Eo '\.{1}[0-9]+-no-protobuf$'`
    # for example v0.1.1
    version2=`echo $lastTag | grep -Eo '[0-9]+\.{1}[0-9]+-no-protobuf$'`
    oldVersion=`echo $lastTag | grep -Eo '[0-9]+-no-protobuf$'`
    oldVersion="${oldVersion/-no-protobuf/}"
    newVersion=".$(($oldVersion + 1))-no-protobuf"
    # for example v0.1.1
    newVersion2="${version2/$version1/$newVersion}"
    newTag="${lastTag/$version2/$newVersion2}"
  else
    if [ "$version" = "minor" ]; then
      echo "Minor release"
      version1=`echo $lastTag | grep -Eo '\.{1}[0-9]+-no-protobuf$'`
      version2=`echo $lastTag | grep -Eo '[0-9]+\.{1}[0-9]+-no-protobuf$'`
      oldVersion=`echo $lastTag | grep -Eo '[0-9]+-no-protobuf$'`
      oldVersion="${version2/$version1/}"
      newVersion="$(($oldVersion + 1)).0-no-protobuf"
      newTag="${lastTag/$version2/$newVersion}"
    else
      if [ "$version" = "major" ]; then
        echo "Major release"
        version1=`echo $lastTag | grep -Eo '^v[0-9]+'`
        oldVersion="${version1/v/}"
        newVersion="$(($oldVersion + 1)).0.0-no-protobuf"
        newTag="v$newVersion"
      else
        echo "Custom release"
        existingTag=`git tag | grep -E "^$newTag$"`
        if [ ! -z "$existingTag" ]; then
          echo "Tag \"$newTag\" already exists, please choose another"
          exit
        fi
        echo "Will use tag \"$newTag\" from input"
      fi
    fi
  fi
fi

echo  "Updating package version ..."
error=`node "./scripts/update-version.js" "$newTag"`
exitCode="$?"
#
if [ "$exitCode" != "0" ]; then
  echo "ERROR"
  echo "$error"
  echo "Please fix the error and try again"
  exit
fi

git tag $newTag
newVersion="${newTag/v/}"
git commit "package.json" -m"$newVersion"

echo "New tag \"$newTag\" for version \"$newVersion\" ($version) created"

upstreamExists=`git remote -v | grep upstream_tmp_release | tail -1`
if [ "$upstreamExists" != "" ]; then
  git remote remove upstream_tmp_release
fi
git remote add upstream_tmp_release git@github.com:lightstep/lightstep-tracer-javascript.git

git push --set-upstream upstream_tmp_release no_protobuf
git push upstream_tmp_release "$newTag"

git remote remove upstream_tmp_release
