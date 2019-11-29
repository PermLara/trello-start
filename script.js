//Алексей Данчин

Application.load()


	
document
	.querySelector('[data-action-addColumn]')
	.addEventListener('click', function(event) {
		const column = new Column
		document.querySelector('.columns').append(column.element)
		
		Application.save()
	})
