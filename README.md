# Liferay.com Guide
Easy guides for content authors making changes to Liferay.com

*For adding docs to our [external site](http://ryanschuhler.github.io/lrdcom-recipes/)*

## Table of Contents
1. [Setting Up](#setting-up)
2. [Creating/Updating Docs](#creating-updating-docs)
3. [Seeing Changes Locally](#seeing-changes-locally)

#### Setting Up
1. Run `npm install` on the root to install all dependencies. 
2. Run `gulp`. 

*It's now watching for changes.*

#### Creating/Updating Docs
1. Make sure gulp is running. See [Setting Up](#setting-up).
2. Make changes in `/documentation`
3. Add and push changes to git.

To add images just use plain ol' HTML and put the images in the same directory as the file. `<img src="my-image-in-the-same-directory.jpg" />`

#### Seeing Changes Locally
If you want to see changes locally before pushing to live, run `python -m SimpleHTTPServer` on the root and head to `localhost:8000`

#### To Do Feature List
- <del>images integration</del>
- <del>dynamic building nav</del>
- <del>swap to gulp sass to reduce dependencies.</del>
- search results navigate with keyboard
- integrate into process
- get intitial content up there