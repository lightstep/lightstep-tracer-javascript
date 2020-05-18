echo "Preparing Release"

echo  "Checking npm version ..."
checkNpm=`node "./scripts/check-npm.js"`
exitCode="$?"

if [ "$exitCode" = "0" ]; then
  echo "Current version to be released \"$checkNpm\""
else
  echo "ERROR"
  echo "$checkNpm"
  echo "Please fix the error and try again"
  exit
fi

upstreamExists=`git remote -v | grep upstream_tmp_release | tail -1`
if [ "$upstreamExists" != "" ]; then
  git remote remove upstream_tmp_release
fi
git remote add upstream_tmp_release git@github.com:lightstep/lightstep-tracer-javascript.git

git push --set-upstream upstream_tmp_release master
git push upstream_tmp_release "v$checkNpm"

git remote remove upstream_tmp_release
