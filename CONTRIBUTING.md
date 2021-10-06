# Contributing

## Installations

This section explains how to install and begin to work locally.

```bash
# Clone the git repository
# Use ssh to clone (if no ssh key found : https://docs.github.com/en/authentication/connecting-to-github-with-ssh)
$ git clone git@github.com:auchan-squid-game/auchan-squid-game.git

# Install node.js dependencies
$ npm install
```

## Command line tools

This section explains all available commands to develop.

```bash
# Run the development server
# The application is then available at http://localhost:8080 (or http://localhost:8081)
npm run serve

# Run the linter to check the respect of the code conventions
npm run lint
```

## Development process

This section explains how to contribute at this project.

1. Assign an issue to yourself
2. Create a new branch from develop
   2.1. The branche name must being with the issue type : `feat/*`, `fix/*`, `chore/*`
   2.1. Then the branch name must show with the issue ID
   2.2. Finally the branch name must have an explicit name depending on feature/fix to develop (each words must be separated by `-` character)
   2.3. Example : The issue **12** is a feature to show a popup to users, the branch name could be : `feat/12-show-enigma-popup`
3. Push the new branch to the remote
4. Create a pull request
   4.1. Create a pull request from your branch with `develop` branch as target
   4.2. The pull request title should be the issue one
5. Once the developments are completed, select @fduquesne as reviewer

## VS Code Extentions

This section lists all VS Code extentions that will help you to contribute at this project :
| Extention ID | Name | Obligatoire | Description |
| :-: | :- | :-: | :- |
| dbaeumer.vscode-eslint | ESLint | ✅ | Check the respect of the code conventions. |
| esbenp.prettier-vscode | Prettier | ✅ | Format the code automatically on save (enable it on VS Code settings). |
| octref.vetur | Vetur | ✅ | Enable color syntax highlighting on Vue.js files. |
| pkief.material-icon-theme | Material Icon Theme | ❌ | VS Code Explorer icons pack. |
| xmorse.dark-theme-github | Dark Github Theme | ❌ | VS Code dark theme. |
