# Liferay.com Documentation and Guidelines
Easy guides for content authors making changes to Liferay.com

*For adding docs to our [external site](https://liferay.github.io/web-dev-lrdcom/#/)* 

*Feature List: https://trello.com/b/ft2uFMNq/lrdcom-external-docs*

## Table of Contents
1. [Setting Up](#setting-up)
2. [Creating/Updating Docs](#creating-updating-docs)
3. [Writing Docs Instructions and Guidelines](#writing-docs-instructions-and-guidelines)

## Setting Up
1. Run `npm install` on the root to install all dependencies. 
2. Run `npm start` and head to `http://localhost:8000` 

*It's now watching for changes through Gulp.*

## Creating/Updating Docs
1. Make sure gulp is running. See [Setting Up](#setting-up).
2. Make changes in `/documentation`
3. Add, commit, and push changes to git. 
 
Changes should reflect on the live site in a few minutes.

**Images / Screenshots**

To add images just use plain ol' HTML and put the images in the same directory as the file. `<img src="my-image-in-the-same-directory.jpg" />`

## Writing Instructions and Guidelines

**Instructions**

1. Make a new .md file in the proper folder and write up your documentation there following our guidelines
2. Submit to Liferay's copyrighters for readability 
3. Push changes to GIT to see changes pushed to live site
4. If change is significant Communicate with marketing stakeholders that a change has been made.

**General Rules**

1. Need an H1 for Title. Break up sections by H2. This ensures page title and sectioning is done accurately

**Writing Guidelines**

1. Include an Intro as the first section. 
2. Try to include a video screencast as reading tech instructions can be hard

Great resources:
- https://jacobian.org/writing/great-documentation/
