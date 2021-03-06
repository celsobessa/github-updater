/**
 * Javascript to show and hide the API specific settings
 * for the remote install feature.
 *
 * @class  Fragen\GitHub_Updater\Install
 * @since  4.6.0
 * @access public
 */
(function () {

	// Hide non-default (Bitbucket & GitLab) settings on page load.
	var nonDefault = ['bitbucket', 'gitlab', 'gitea'];

	//testing
	nonDefault.forEach(function(item){
		var rows = document.querySelectorAll('input.'.concat(item, '_setting'));
		rows = document.parentElement(rows);
		var parents = getParents(item, 'tr');
		//rows = Array.from( rows );
		//var children = getDirectChildren(rows, 'tr');
		console.log( rows, parents);
		rows.forEach(function(item){
			console.log(item);
			//item.style.display = 'none';
		})
		//rows[0].style.display = 'none';
	});

	nonDefault.forEach(function (item) {
		var parents = getParents(item, 'tr');
		parents[0].style.display = 'none';
	});

	// When the api selector changes.
	var selects = document.querySelector('select[ name="github_updater_api" ]');

	selects.addEventListener('change', function () {
		var defaults = ['github', 'bitbucket', 'gitlab', 'gitea'];

		// Create difference array.
		var hideMe = remove(defaults, this.value);

		// Hide items with unselected api's classes.
		hideMe.forEach(function (item) {
			var parents = getParents(item, 'tr');
			parents[0].style.display = 'none';
		});

		// Show selected setting.
		[this.value].forEach(function (item) {
			var parents = getParents(item, 'tr');
			parents[0].style.display = '';
		});
	});

	// Remove selected element from array and return array.
	function remove(array, element) {
		const index = array.indexOf(element);
		if (index !== -1) {
			array.splice(index, 1);
		}

		return array;
	}

	// Return query and selector for `$(query).parents.(selector)`
	function getParents(item, selector) {
		var settings = document.querySelector('input.'.concat(item, '_setting'));
		return vanillaParents( settings, selector);
	}

	// Vanilla JS version of jQuery `$(query).parents(selector)`
	function vanillaParents(element, selector) {
		var parents = [];
		while (element = element.parentElement.closest(selector))
			parents.push(element);

		return parents;
	}

})();
