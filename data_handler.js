

$(document).on('drop','#data_dropoff_Pisarenko', function(event){
	$(this).removeClass('hover');
});

$(document).on('dragenter','#data_dropoff_Pisarenko', function(event){
	event.preventDefault();
	$(this).addClass('hover');
});

$(document).on('dragleave','#data_dropoff_Pisarenko', function(event){
	$(this).removeClass('hover');
});



$(document).on('drop','#data_dropoff_Mobility', function(event){
	$(this).removeClass('hover');
});

$(document).on('dragenter','#data_dropoff_Mobility', function(event){
	event.preventDefault();
	$(this).addClass('hover');
});

$(document).on('dragleave','#data_dropoff_Mobility', function(event){
	$(this).removeClass('hover');
});



$(document).on('drop','#data_dropoff_zT', function(event){
	$(this).removeClass('hover');
});

$(document).on('dragenter','#data_dropoff_zT', function(event){
	event.preventDefault();
	$(this).addClass('hover');
});

$(document).on('dragleave','#data_dropoff_zT', function(event){
	$(this).removeClass('hover');
});



function generate_reader(reader_type) {

	let reader = new FileReader();

	reader.onload = function(e) {
		// Get lines in file as list
		const file_content = e.target.result;
		const lines = file_content.split(/\r\n|\n/);

		// Parse lines in file (now as list)
		if (reader_type === "Pisarenko") {
			parseResults_Pisarenko(lines);
		} else if (reader_type === "Mobility") {
			parseResults_Mobility(lines);
		} else if (reader_type === "zT") {
			parseResults_zT(lines);
		}
	};

	reader.onerror = function(e) {
		alert(e.target.error.name);
	};

	return reader

}



function parseResults_Pisarenko(lines) {

	var CC_Seebeck = [];

	for (var line_index = 0; line_index < lines.length; line_index++) {
		line_data = lines[line_index].split(",");
		CC_Seebeck.push( { x: Number(line_data[0]), y: Math.abs(Number(line_data[1])) } )	// Get CC and absolute value of Seebeck
	}

	console.log(CC_Seebeck);

	Pisarenko_Plot_Obj.data.datasets[0].data = CC_Seebeck;
	Pisarenko_Plot_Obj.update();
}




function parseResults_Mobility(lines) {

	var CC_mobility = [];

	for (var line_index = 0; line_index < lines.length; line_index++) {
		line_data = lines[line_index].split(",");
		CC_mobility.push( { x: Number(line_data[0]), y: Number(line_data[1]) } )
	}

	Mobility_Plot_Obj.data.datasets[0].data = CC_mobility;
	Mobility_Plot_Obj.update();
}



function parseResults_zT(lines) {

	var CC_zT = [];

	for (var line_index = 0; line_index < lines.length; line_index++) {
		line_data = lines[line_index].split(",");
		CC_zT.push( { x: Number(line_data[0]), y: Number(line_data[1]) } )
	}

	zT_Plot_Obj.data.datasets[0].data = CC_zT;
	zT_Plot_Obj.update();
}





function dropHandler(event, reader_type) {
	
	let reader = generate_reader(reader_type);

	console.log('File dropped.');

	// Prevent default behavior, which is to open the file
	event.preventDefault();

	if (event.dataTransfer.items) {
		
		// Use DatatransferItemList to access file
		file = event.dataTransfer.items[0].getAsFile();

		reader.readAsText(file);
	}
}





function dragOverHandler(event) {
	console.log('File in drop zone');

	// Prevent default behavior, which is to open the file
	event.preventDefault();
}





