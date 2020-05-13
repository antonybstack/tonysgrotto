<!-- dependencies -->

npm install
npm install nodemon -g

<!-- Cannot be loaded because running scripts is disabled on this system -->

To change the execution policy for the default, start Windows PowerShell with the "Run as administrator" option. To change the execution policy for the current user, run "Set-ExecutionPolicy -ExecutionPolicy RemoteSigned"

<!-- server startup -->

npm run dev

or

terminal 1: 'nodemon server' in \tonysgrotto\backend
terminal 2: 'mongod' in \tonysgrotto
terminal 3: 'mongo' in \tonysgrotto
'use tickets' in \tonysgrotto
terminal 4: 'start npm' in \tonysgrotto

<!-- typical git push -->

git status
git add .
git commit -m "message"
git push origin master (git push origin branch-name)

<!-- makes new branch -->

git checkout -b new-branch-name
git push origin new-branch-name

<!-- shows all branches -->

git branch -a //shows all branches

<!-- undo all changes to current branch -->

git reset --hard

<!-- push current branch to master -->

git push origin 'current-branch':master

<!-- switch branch  -->

git checkout 'branch-name'

<!-- updating local master with remote master -->

git pull --rebase origin master

<!-- push heroku app -->

git add .  
git commit -am "heroku deploy"  
heroku git:remote -a still-headland-32486
git push heroku master

<!-- what helped me implement backend -->

https://www.youtube.com/watch?v=qvBZevK1HPo&list=PL2dKqfImstaRbG8WIBkeHyV1ic5dyiEMj
