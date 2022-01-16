

/*
$(document).ready(function () {
	$("#doi-names").change(function () {
		var value = $(this).val();
		
		let temperatures_options = '';
		var temperatures = [300, 400, 500];
		for (i = 0; i < temperatures.length; i++) {
			temperatures_options += '<option value="'+temperatures[i]+'">'+temperatures[i]+'</option>';
		}
		console.log(temperatures_options);
		$("#temperature").html(temperatures_options);
	});
});
*/







/*
var csv_data_dict = {}

const available_csv_files = [
	'10.1002_adfm.201606361_Ca9Zn4Sb9.csv',
	'10.1002_adfm.201801617_PbTe.csv',
	'10.1002_adfm.201906143_Mg3Sb1.5Bi0.5.csv',
	'10.1002_adfm.201908405_SnSe2.csv',  
	'10.1002_aenm.201800775_SnSe.csv',
	'10.1002_andp.201900421_PbTe.csv',
	'10.1002_andp.201900440_VCoSb.csv',
	'10.1002_slct.201901565_Bi0.3Sb1.7Te.csv',
	'10.1007_s10853-012-6463-6_Bi0.88Sb0.12.csv',
]

var current_compound_name = "Ca9Zn4Sb9";

// var not_recorded = true;

for (var i = 0; i < available_csv_files.length; i++) {
	
	var csv_filename = available_csv_files[i];
	var split_csv_filename = csv_filename.split("_");
	var compound_name = split_csv_filename[split_csv_filename.length-1].split(".csv")[0];

	csv_data_dict[compound_name] = {};
	csv_data_dict[compound_name]["Temperatures"] = [];
	csv_data_dict[compound_name]["UniqueTemperatures"] = [];
	csv_data_dict[compound_name]["S"] = [];
	csv_data_dict[compound_name]["zT"] = [];
	csv_data_dict[compound_name]["mu"] = [];
	csv_data_dict[compound_name]["CC"] = [];

	console.log(compound_name);

	fetch('example_data/StarryData2_Test/'+csv_filename)
	.then(function(response) {
		return response.text()
	})
	.then(function(csv) {
		csv_lines = csv.split("\n");
		//console.log(csv_lines[0]);
		for (var i = 1; i < csv_lines.length-1; i++) {
			csv_line_data = csv_lines[i].split(",");
			var temperature = Number(csv_line_data[2]);
			csv_data_dict[compound_name]["Temperatures"].push( temperature );
			if (! csv_data_dict[compound_name]["UniqueTemperatures"].includes(temperature)) {
				csv_data_dict[compound_name]["UniqueTemperatures"].push( temperature );
			}
			csv_data_dict[compound_name]["S"].push( Number(csv_line_data[3]) );
			csv_data_dict[compound_name]["zT"].push( Number(csv_line_data[4]) );
			csv_data_dict[compound_name]["mu"].push( Number(csv_line_data[5]) );
			csv_data_dict[compound_name]["CC"].push( Number(csv_line_data[6]) );
		}
		csv_data_dict[compound_name]["UniqueTemperatures"].sort((a,b) => a-b);
	})
	.then(function(response) {
		//var not_recorded = true;
		while (compound_name !== current_compound_name) {
			if (csv_data_dict[compound_name]["Temperatures"].length !== 0 ) {
				console.log("Yes", compound_name);
				//not_recorded = false;
				current_compound_name = compound_name;
			}
		}
		return Promise.resolve(response)
	})
}
*/




csv_data_dict = {};

fetch('example_data/StarryData2_Test/Test.csv')
.then(function(response) {
	return response.text()
})
.then(function(csv) {
	csv_lines = csv.split("\n");
	for (var i = 1; i < csv_lines.length; i++) {
		csv_line_data = csv_lines[i].split(",");

		var compound_name = csv_line_data[0];
		var doi = csv_line_data[7];
		if (! doi) {continue;}
		var identifier = doi.split("\r")[0]+"_"+compound_name;
		
		if (! csv_data_dict.hasOwnProperty(identifier)) {
			csv_data_dict[identifier] = {};
			csv_data_dict[identifier]["Temperatures"] = [];
			csv_data_dict[identifier]["UniqueTemperatures"] = [];
			csv_data_dict[identifier]["S"] = [];
			csv_data_dict[identifier]["zT"] = [];
			csv_data_dict[identifier]["mu"] = [];
			csv_data_dict[identifier]["CC"] = [];
		}

		var temperature = Number(csv_line_data[2]);
		csv_data_dict[identifier]["Temperatures"].push( temperature );
		if (! csv_data_dict[identifier]["UniqueTemperatures"].includes(temperature)) {
			csv_data_dict[identifier]["UniqueTemperatures"].push( temperature );
		}
		csv_data_dict[identifier]["S"].push( Number(csv_line_data[3]) );
		csv_data_dict[identifier]["zT"].push( Number(csv_line_data[4]) );
		csv_data_dict[identifier]["mu"].push( Number(csv_line_data[5]) );
		csv_data_dict[identifier]["CC"].push( Number(csv_line_data[6]) );
	}
	for (var identifier in csv_data_dict) {
		csv_data_dict[identifier]["UniqueTemperatures"].sort((a,b) => a-b);
	}

	let csv_options = '';
	for (var identifier in csv_data_dict) {
		var identifier_list = identifier.split("_");
		var compound_name = identifier_list.pop();
		var doi = identifier_list.join("_");
		console.log(compound_name, doi);
		//csv_options += '<option value="'+identifier+'">'+compound_name+' ('+ doi +') </option>';
		csv_options += '<option value="'+identifier+'">'+compound_name+'</option>';
	}
	$("#doi-names").html(csv_options);

	// Set unique temperatures of selection
	setUniqueTemperatures(Object.keys(csv_data_dict)[0]);


})







/*
function get_csv_data(doi_name) {
	var doi_temperatures = [];
	var doi_seebeck = [];
	var doi_zT = [];
	var doi_mu = [];
	var doi_n = [];
	
	console.log(csv_data_dict[doi_name]);

	request_csv_data(doi_name)
	.then(function(csv) {
		csv_lines = csv.split("\n");
		console.log(csv_lines[0]);
		for (var i = 1; i < csv_lines.length-1; i++) {
			csv_line_data = csv_lines[i].split(",");
			doi_temperatures.push( Number(csv_line_data[2]) );
			doi_seebeck.push( Number(csv_line_data[3]) );
			doi_zT.push( Number(csv_line_data[4]) );
			doi_mu.push( Number(csv_line_data[5]) );
			doi_n.push( Number(csv_line_data[6]) );
		}
	})

	var data = [];
	data.push(doi_temperatures);
	data.push(doi_seebeck);
	data.push(doi_zT);
	data.push(doi_mu);
	data.push(doi_n);

	console.log(doi_temperatures);

	return data
}
*/





function doiChange(element) {
	
	var doi_compound_id = element.options[element.selectedIndex].value;
	
	console.log(doi_compound_id);

	// Set unique temperatures of selection
	setUniqueTemperatures(doi_compound_id);

	// Change link to the selected DOI
	var doi_field = document.querySelector("#doi-link");
	var new_doi = "http://doi.org/"+doi_compound_id.split("_")[0]+"/"+doi_compound_id.split("_")[1];
	doi_field.setAttribute("href", new_doi);
	doi_field.innerHTML = new_doi;

	// Reset plot
	Pisarenko_Example_Plot_Obj.data.datasets[1].data = [];
	Pisarenko_Example_Plot_Obj.update();
	Mobility_Example_Plot_Obj.data.datasets[1].data = [];
	Mobility_Example_Plot_Obj.update();
	zT_Example_Plot_Obj.data.datasets[1].data = [];
	zT_Example_Plot_Obj.update();


	// Plot example data
	var temperature_selection = document.querySelector("#temperatures");
	var temperature = Number( temperature_selection.options[temperature_selection.selectedIndex].text.split(" ")[2] );
	Plot_Example_Data(doi_compound_id, temperature);
}




function setUniqueTemperatures(doi_id) {
	// Get unique temperatures of selection
	var unique_temperatures = csv_data_dict[doi_id]["UniqueTemperatures"];

	// Set unique temperatures of selection
	let temperatures_options = '';
	for (i = 0; i < unique_temperatures.length; i++) {
		temperatures_options += '<option value="'+unique_temperatures[i]+'">T = '+unique_temperatures[i]+' K</option>';
	}
	$("#temperatures").html(temperatures_options);
}



