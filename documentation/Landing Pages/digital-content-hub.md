# Digital Content Hub

## Intro
Landing pages are actually web content articles with a series of embedded web content articles. This allows us to easily create and launched a new landing page without much work. However there are a few manual steps necessary.

## Creating a New Landing Page
1. Navigate to the landing page admin page [www.liferay.com/resources/admin]("http://www.liferay.com/resources/admin")
2. Select the desired landing page template and click "Create"
3. You will be redirected to a new landing page
4. Update Landing Page Title and URL
	1. Copy the current URL and save it for step 5
	2. Scroll to the bottom and click "Edit Landing Page"
	3. Update title to reflect desired friendly URL (i.e. desired friendly URL: /your-new-landing-page, title: Your New Landing Page)
	4. Save changes by clicking "Publish"
	5. Navigate to the URL from step 1
	6. Scroll to the bottom and click "Update URL"
	7. The URL for your landing page should now be www.liferay.com/resources/your-new-landing-page
5. Update embedded article titles
	1. For each embedded article click on the "Edit" link on the left below the article
	2. Prepend the existing title with the landing page title (i.e. "DCH Banner - /resources" > "Your New Landing Page DCH Banner - /resources")
	3. Save changes by clicking "Publish"
6. Edit content

## Editing Rules
### Article
- class: `max-med`

### Section
- text field: blank
- class: blank

### Block
- text field: blank
- class: `standard-padding-vertical`

### Element
##### Headers
- text field: blank
- tag: `h2`, `h3`, or `h4`
- content: header text
- class: blank

##### Paragraphs
- text field: blank
- tag: `p`
- content: paragraph text (see additional editing rules for special use cases)
- class: `small-padding-vertical`

##### Source text
- text field: blank
- tag: `div` or blank
- content: source text
- class: `source-text`

##### Pull Quotes
- text field: blank
- tag: `div` or blank
- content: pull quote text
- class: `pull-quote-left` or `pull-quote-right` and `dxp-primary-color`, `pull-quote`, and `standard-padding`

##### Images
- text field: `alt` and `src` i.e. `alt=“brief description of image” src=“/documents/folder-number/folder-number/name-of-image.jpg”`
- tag: `img`
- content: blank
- class: blank

##### Lists
- text field: blank
- tag: `ul`
- content: wrap each list item in `<li></li>` (i.e. \<li\>Your content here\</li\>)
- class: `small-padding-vertical`

##### Tables
- Please check back soon for documentation on tables.


## Additional Editing Rules
- Add a new block for each header.

- Introduction paragraphs should be in their own block and should receive the class `introduction` in addition to `small-padding-vertiacl`.

- When articles begin with a paragraph instead of a header, the `p` element should receive the class `drop-cap` in addition to `small-padding-vertical`.

- Images should be uploaded to the documents and media folder corresponding to the landing page category they will be used in (i.e. /RESOURCES/LANDING PAGES/DIGITAL CONTENT HUB).

- You can retrieve image URLs by clicking on the image in Docs and Media and clicking on “URL” on the right hand side.

- When referencing a cited source, wrap the source number in `<sup>` and `</sup>` (i.e. "Some idea taken from a specific source\<sup\>1\</sup\>.").

- When creating a link, wrap the link text in `<a href="http://www.example.com">` and `</a>` (i.e. "To search the web use [Google](http://www.google.com)" should be written "To search the web use `<a href="http://www.google.com">`Google`</a>`")