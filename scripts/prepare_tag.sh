if ! git diff-index --quiet HEAD --; then
  echo ""
  echo "You have uncommitted changes, please commit them before continuing"
  echo ""
  echo "operation aborted"
  echo ""
  exit 0
fi
newTag="$1"

echo  "Fetching tags ..."
git fetch --tags

if [ -z "$1" ]; then
  lastTag=`git tag | grep -E '^v\d+.+-no-protobuf$' | sort -t . -k 2 -g | tail -1`
  if [ -z "$lastTag" ]; then
    newTag="v0.1"
    echo "No previous tag found, using default: $newTag"
  else
    # for example v0.1
    version1=`echo $lastTag | grep -Eo '\.{1}[0-9]+-no-protobuf$'`
    # for example v0.1.1
    version2=`echo $lastTag | grep -Eo '[0-9]+\.{1}[0-9]+-no-protobuf$'`
    oldVersion=`echo $lastTag | grep -Eo '[0-9]+-no-protobuf$'`
    oldVersion="${oldVersion/-no-protobuf/}"
    newVersion=".$(($oldVersion + 1))-no-protobuf"
    if [ -z "$version2" ]; then
      # for example v0.1
      newTag="${lastTag/$version1/$newVersion}"
    else
      # for example v0.1.1
      newVersion2="${version2/$version1/$newVersion}"
      newTag="${lastTag/$version2/$newVersion2}"
    fi
  fi
else
  existingTag=`git tag | grep -E "^$newTag$"`
  if [ ! -z "$existingTag" ]; then
    echo "Tag \"$newTag\" already exists, please choose another"
    exit
  fi
  echo "Will use tag \"$newTag\" from input"
fi

echo  "Checking npm version ..."
checkNpm=`node "./scripts/check-npm.js"`
exitCode="$?"

if [ "$exitCode" = "0" ]; then
  echo "Current version to be released \"$checkNpm\" with tag \"$newTag"
else
  echo "ERROR"
  echo "$checkNpm"
  echo "No tag has been created"
  echo "Please fix the error and try again"
  exit
fi

echo "Do you want to create and push the \"$newTag\" tag to trigger automatic release now?"
echo "Please choose \"1\" to proceed"
choices=("Yes" "No")
select choiceRelease in ${choices[@]}
do
    echo $choiceRelease
    break
done

if [ "$choiceRelease" = "Yes" ]; then
  git tag $newTag
  echo "New tag \"$newTag\" created"
  git push origin "$newTag"
fi

#git tag | xargs git tag -d