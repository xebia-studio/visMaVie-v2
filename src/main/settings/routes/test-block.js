/*
'test-block' route contains subroutes for displaying draft component, used for prototyping purpose
must be disabled from prod
*/

/*---------------*/

module.exports = [
	{
		path:'/test-block/background-image-cover',
		component: require('components/BackgroundImageCoverTestingBlock')
	},
	{
		path:'/test-block/DiscoverExpertiseButton',
		component: require('components/DiscoverExpertiseButton')
	}
];
