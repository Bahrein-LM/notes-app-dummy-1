# notes-app-dummy-1

### Next Lesson: Deployment

<p> 
    &nbsp; &nbsp; before this lesson, we always deploy front-end and back-end seperately. But right now, we learn on how to deploys the both of it one at a time. This is the new way to deploy a MERN stack application.
</p>

<br>

Here is the step that you need to follow:

#### First Step

you need to initialize node package manager on center folder (not inside backend or frontend) by using this command:

```bash
npm init -y
```
#### Second Step

Second, edit your package.json on the scripts part:

```bash

"scripts": { 
    'build': 'npm install --prefix backend && npm install --prefix frontend'
}
```
#### Third Step

Third, run this command on the CMD or PowerShell:

```bash
npm run build
```
&nbsp; &nbsp; &nbsp; then automatically `node_manager` on both folders `frontend` and `backend` will be created.

## Quick Reminder

&nbsp; &nbsp; when you try to push safely for the first time onto the github you must follow this command to push safely on github

```bash
git add .
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/CodePolitan/notes-app-dummy-1.git
git push -u origin main
```
&nbsp; &nbsp; if you got an error notification because you need to pull it first. Don't worry, that was just a safety precautions because there is a `README` or `license` file that already exist on your repository. To handle it, follow this command:

```bash
git pull origin main --rebase
git push -u origin main
```

