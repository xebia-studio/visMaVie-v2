@endToEnd @visual @siteNavigation
Feature: Site navigation
	As an user of vismavie.xebia.fr
	I want to navigate through the pages of the site
	In order to see informations about Xebia

	Background:
		Given I have the website "vismavie.xebia.fr" with the sources hosted in "/dist"

	Scenario Outline: Visiting all the pages
		When I visit the page at <pageUrl>
		And I wait for all the elements, fonts and assets of the page to be loaded and rendered
		Then the page title is <pageTitle>
		And for all devices, the page looks like the baseline named <pageTitle>

		Examples:
			|       page      |   pageTitle   | pageUrl |
			|       home      |     Xebia     |    /    |
			| expertise back  | Xebia - back  |  /back  |
			| expertise front | Xebia - front | /front  |