
// import { Update_Pisarenko, Update_Mobility, Update_zT } from './plot_utils.js';


const pisarenko_plot = document.getElementById("Example_Pisarenko_Plot").getContext("2d");
const mobility_plot = document.getElementById("Example_Mobility_Plot").getContext("2d");
const zT_plot = document.getElementById("Example_zT_Plot").getContext("2d");


const temperature_plot_min = 350;
const temperature_plot_max = 850;
//const CC_plot_min = 1E15;
//const CC_plot_max = 1E21;


/*
// Plot settings
let plot_settings = {
	type: "line",
	data: {
		labels: null,
		datasets: [
			{
				// Example Pisarenko data
				fill: false,
				lineTension: 0,
				backgroundColor: "rgba(0,0,255,1.0)",	// Color of points
				borderColor: "rgba(0,0,255,0.1)",		// Color of lines
				showLine: false,
				data: null,
			},
			{
				// Model Pisarenko
				fill: false,
				lineTension: 0,
				borderColor: "rgba(0,0,255,1.0)",		// Color of lines
				showLine: true,
				pointRadius: 0,
				data: null,
			}
		]
	},
	options: {
		responsive: false,
		aspectRatio: 1,
		maintainAspectRatio: true,
		plugins: {
			legend: {
				display: false,
				position: 'bottom',
			},
		},
		scales: {
			x: {
				title: {
					display: true,
					text: 'Hall Carrier Concentration (cm\u00B3)'
				},
				type: 'logarithmic',
				min: CC_plot_min,
				max: CC_plot_max,
				ticks: {
					stepSize: 100  // Doesn't do anything lol
				}
			},
			y: {
				title: {
					display: true,
				}
			}
		},
		events: [], // No more hover
	}
}


function setYAxis(plot_settings_obj, ytitle, ytype, ymin, ymax, ystepsize) {
	plot_settings_obj.options.scales.y.title.text = ytitle;
	plot_settings_obj.options.scales.y.type = ytype;
	plot_settings_obj.options.scales.y.min = ymin;
	plot_settings_obj.options.scales.y.max = ymax;
	plot_settings_obj.options.scales.y.ticks = {};
	plot_settings_obj.options.scales.y.ticks.stepSize = ystepsize;
	return plot_settings_obj
}
*/

Chart.defaults.font.family = 'Rubik';
Chart.defaults.font.size = 16;


// Pisarenko plot
var Pisarenko_Example_Plot_Obj = new Chart(pisarenko_plot, {
	type: "line",
	data: {
		labels: null,
		datasets: [
			{
				// Example Pisarenko data
				fill: false,
				lineTension: 0,
				backgroundColor: "rgba(0,0,255,1.0)",	// Color of points
				borderColor: "rgba(0,0,255,0.1)",		// Color of lines
				showLine: false,
				data: null,
			},
			{
				// Model Pisarenko
				fill: false,
				lineTension: 0,
				borderColor: "rgba(0,0,255,1.0)",		// Color of lines
				showLine: true,
				pointRadius: 0,
				data: null,
			}
		]
	},
	options: {
		responsive: false,
		aspectRatio: 1,
		maintainAspectRatio: true,
		plugins: {
			legend: {
				display: false,
				position: 'bottom',
			},
		},
		scales: {
			x: {
				title: {
					display: true,
					text: 'Temperature (K\u00B3)' // 'Hall Carrier Concentration (cm\u00B3)' replaced by temperature

				},
				type: 'logarithmic',
				min: temperature_plot_min,
				max: temperature_plot_max,
				ticks: {
					stepSize: 100  // Doesn't do anything lol
				}
			},
			y: {
				title: {
					display: true,
					text: '|Seebeck Coefficient| (\u03BCV/K)'
				},
				min: 0,
				max: 600,
				ticks: {
					stepSize: 100
				}
			}
		},
		events: [], // No more hover
	}
});



// Mobility plot

var Mobility_Example_Plot_Obj = new Chart(mobility_plot, {
	type: "line",
	data: {
		labels: null,
		datasets: [
			{
				// Example Pisarenko data
				fill: false,
				lineTension: 0,
				backgroundColor: "rgba(0,0,255,1.0)",	// Color of points
				borderColor: "rgba(0,0,255,0.1)",		// Color of lines
				showLine: false,
				data: null,
			},
			{
				// Model Pisarenko
				fill: false,
				lineTension: 0,
				borderColor: "rgba(0,0,255,1.0)",		// Color of lines
				showLine: true,
				pointRadius: 0,
				data: null,
			}
		]
	},
	options: {
		responsive: false,
		aspectRatio: 1,
		maintainAspectRatio: true,
		plugins: {
			legend: {
				display: false,
				position: 'bottom',
			},
		},
		scales: {
			x: {
				title: {
					display: true,
					text:  'Temperature (K\u00B3)' //temperature changed
				},
				type: 'logarithmic',
				min: temperature_plot_min,
				max: temperature_plot_max,
				ticks: {
					stepSize: 100  // Doesn't do anything lol
				}
			},
			y: {
				title: {
					display: true,
					text: 'Mobility (cm\u00B2/Vs)'
				},
				type: 'logarithmic',
				min: 0,
				max: 600,
				ticks: {
					stepSize: 100
				}
			}
		},
		events: [], // No more hover
	}
});



// zT plot
var zT_Example_Plot_Obj = new Chart(zT_plot, {
	type: "line",
	data: {
		labels: null,
		datasets: [
			{
				// Example zT data
				fill: false,
				lineTension: 0,
				backgroundColor: "rgba(0,0,255,1.0)",	// Color of points
				borderColor: "rgba(0,0,255,0.1)",		// Color of lines
				showLine: false,
				data: null,
			},
			{
				// Model zT
				fill: false,
				lineTension: 0,
				borderColor: "rgba(0,0,255,1.0)",		// Color of lines
				showLine: true,
				pointRadius: 0,
				data: null,
			}
		]
	},
	options: {
		responsive: false,
		aspectRatio: 1,
		maintainAspectRatio: true,
		plugins: {
			legend: {
				display: false,
				position: 'bottom',
			},
		},
		scales: {
			x: {
				title: {
					display: true,
					text: 'Temperature (K\u00B3)' //hcc changed to temp

				},
				type: 'logarithmic',
				min: temperature_plot_min,
				max: temperature_plot_max,
				ticks: {
					stepSize: 10 // Doesn't do anything lol
				},
			},
			y: {
				title: {
					display: true,
					text: 'zT'
				},
				min: 0,
				max: 3,
				ticks: {
					stepSize: 0.5
				}
			}
		},
		events: [], // No more hover
	}
});






var effective_mass_slider = document.querySelector("#EffMassSlider");
var effective_mass_slider_output = document.querySelector("#EffMassSliderValue");

var mobility_slider = document.querySelector("#MobilitySlider");
var mobility_slider_output = document.querySelector("#MobilitySliderValue");

var kappa_slider = document.querySelector("#KappaSlider");
var kappa_slider_output = document.querySelector("#KappaSliderValue");

effective_mass_slider_output.innerHTML = effective_mass_slider.value;
mobility_slider_output.innerHTML = mobility_slider.value;
kappa_slider_output.innerHTML = kappa_slider.value;


function Update_Example_Plots() {
	console.log("Updating...");
	var hcc_selection = document.querySelector("#hallcarrierconcentrations");
   	var hall_carrier_concentration = Number( hcc_selection.options[hcc_selection.selectedIndex].text.split(" ")[2] );
	console.log("Selected hcc: ", hall_carrier_concentration);
	Update_Pisarenko(Pisarenko_Example_Plot_Obj, effective_mass_slider.value, hall_carrier_concentration);
	Update_Mobility(Mobility_Example_Plot_Obj, effective_mass_slider.value, hall_carrier_concentration, mobility_slider.value*1E-4);
	Update_zT(zT_Example_Plot_Obj, effective_mass_slider.value, hall_carrier_concentration, mobility_slider.value*1E-4, kappa_slider.value);

	// Get relevant data
	var doi_selection = document.querySelector("#doi-names");
	var doi_compound_id = doi_selection.options[doi_selection.selectedIndex].value;
	Plot_Example_Data(doi_compound_id, hall_carrier_concentration);
	console.log("Updated");
}

effective_mass_slider.oninput = function() {
	effective_mass_slider_output.innerHTML = effective_mass_slider.value;
	Update_Example_Plots();
}

mobility_slider.oninput = function() {
	mobility_slider_output.innerHTML = mobility_slider.value;
	Update_Example_Plots();
}

kappa_slider.oninput = function() {
	kappa_slider_output.innerHTML = kappa_slider.value;
	Update_Example_Plots();
}



function Plot_Example_Data(doi_id, hall_carrier_concentration) {

	// Get relevant data
	var data = csv_data_dict[doi_id];
	console.log("CSV: ", csv_data_dict);
	console.log("ID: ", doi_id);
	console.log("Data: ", data);
	var doi_temperatures = data["hallcarrierconcentrations"];
	var doi_seebeck = data["S"];
	var doi_zT = data["zT"];
	var doi_mu = data["mu"];
	var doi_n = data["temperature"]; //need a temperature placeholder here


	var doi_seebeck_temp = [];
	var doi_zT_temp = [];
	var doi_mu_temp = [];
	var doi_n_temp = [];
	for (var i = 0; i < doi_hcc.length; i++) {
		if (doi_hcc[i] === hall_carrier_concentration) {
			doi_seebeck_temp.push( Math.abs(doi_seebeck[i])*1E6 );
			doi_zT_temp.push( doi_zT[i] );
			doi_mu_temp.push( doi_mu[i]*1E4 );
			doi_n_temp.push( doi_n[i]*1E-6 ); // doi_n is a temperature identifier, calculation needed for temperature
		}
	}

	Plot(Pisarenko_Example_Plot_Obj, doi_n_temp, doi_seebeck_temp, 0);
	Plot(Mobility_Example_Plot_Obj, doi_n_temp, doi_mu_temp, 0);
	Plot(zT_Example_Plot_Obj, doi_n_temp, doi_zT_temp, 0);
}




