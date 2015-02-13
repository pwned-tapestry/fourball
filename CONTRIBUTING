##Git Work Flow##

#To Start Working

1. Fork the repo, and clone to your machine

1. Add upstream remote

`$ git remote add upstream https://github.com/pwned-tapestry/thesis`

1. Checkout the development branch. Pull requests with commits to the master branch will be rejected.

Initially you may have to tell git where your development branch is coming from. It's on your fork: origin/development.
`$git checkout -b development origin/development`

Hereafter, all you need to do to checkout your development branch is:
`$ git checkout development`

1. From your local development branch, checkout a new branch for your feature/bugfix. Name branch after its purpose and work on the branch.

For example:
`$ git checkout -b bugfix_mobile_swipe`
`$ git checkout -b feature_api_username`

1. Make commits to your feature branch. Commit early and often.

`$git add `
`$git commit `

1. If the upstream remote development branch merges a pull request while you're working on your feature, you'll have to update your local development branch to have the upstream remote development branch code.
`
$ git checkout development
$ git pull --rebase upstream development
`

1. Now that your development branch is up to date with the upstream remote, you'll have to place your current feature branch on top of the new development code.

This is where you'll deal with merge conflicts on your local machine. If you follow this workflow, we'll have fewer/no merge conflicts when merging your pull request.

`
$ git checkout feature_api_username
$ git rebase development
`

_If there is a merge conflict, resolve the conflicts and proceed._

# ... Resolve any conflicts
$ git add .
$ git rebase --continue `

Talk with Nick if this becomes an issue.

1. Now that your local development branch and local feature branch is up-to-date with the upstream remote, push your feature branch to your fork

`$git push origin feature_api_username`

1. Pull request:

Go to GitHub and open a pull request to from your local/feature to thesis/development.

Please reference in the pull request comment the corresponding issue using the [supported keywords](https://help.github.com/articles/closing-issues-via-commit-messages/).

For example: 'This closes #27 and closes #5.'

At the beginning, 2 people from the organization must review a feature pull request.

For documentation changes, only 1 quick review is necessary

1. After your pull request has been made, checkout your development branch, 


8.Go to step 4.

#Github Submission


#References
![workflowImage](http://i.imgur.com/p0e4tQK.png)

http://www.thumbtack.com/engineering/linear-git-history/
