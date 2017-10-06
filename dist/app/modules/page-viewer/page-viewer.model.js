pageViewer.factory(
	'pageViewerUtils',
	function() {
		return {
			getReadingTime: function(text) {
				var pageArray = text.split(' ')
				var timeToRead = pageArray.length / 200;

   				return Math.round(timeToRead);
			}
		};
	}
);