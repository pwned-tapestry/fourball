##Git Work Flow##

For reference 
![workflowImage](http://i.imgur.com/p0e4tQK.png)


#To Start Working follow the above diagram, and replace#

`master`with `development` and `hackreactor:repo` with `pwned-tapestry:thesis`

Here's the step-by-step:

1. Fork the https://github.com/pwned-tapestry/thesis repo.

1. Clone to your local machine.

1. Add upstream remote

`$ git remote add upstream https://github.com/pwned-tapestry/thesis`

1. From your local master, checkout a feature_branch to develop on. Name branch after its purpose and work on the branch.

For example: 
`$ git co -b feature_api_usernames`
or
`$ git co -b bugfix_panel_swipe`

1. Add and commit to your your code to your feature branch

`$git add .`
`$git commit `

1. When you're ready to make a pull request, you'll need to make sure that your feature branch has all of the commits that have been made to the upstream development branch while you've been developing.

`$ git pull --rebase upstream development`

_If there is a merge conflict, resolve them by editing the files with conflicts, adding them, and doing a git --rebase continue._

`$git add `
`$git --rebase continue`

1. After merge conflicts are resolved, push your feature branch to your fork

`#from your feature branch`
`$git push origin feature_api_usernames`

1. Pull request:

Go to your fork and open a pull request from your feature branch to the project development branch

Please reference in the pull request comment the corresponding issue using the [supported keywords](https://help.github.com/articles/closing-issues-via-commit-messages/).

For example: 'This closes #27 and closes #5.'

This will update the waffle.io

In the beginning, 2 people from the organization should review feature pull request.

For documentation, 1 person should review the documentation pull request.

1. After your pull request has been merged, remember to update your local development branch before your cut your next feature branch.

`$ git checkout development`
`$ git pull upstream development`
`$ git checkout -b feature_api_locationData`

#References
For reference 
![workflowImage](http://i.imgur.com/p0e4tQK.png)

http://www.thumbtack.com/engineering/linear-git-history/
