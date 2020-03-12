# Business Joy

browser-sync start --proxy 'theme-development.test/business-theme-html/'

touch .gitignore && echo "node_modules/" >> .gitignore && git rm -r --cached node_modules ; git status

grunt browserSync start --proxy 'theme-development.test/business-theme-html/'
