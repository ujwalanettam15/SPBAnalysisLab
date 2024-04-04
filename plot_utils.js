

// Update SPB Pisarenko plot
//fucntion changed, check
function Update_Pisarenko(Pisarenko_Plot_Obj, eff_mass, temperature) {
	//var cc = calculate_CC(eff_mass, temperature);
	//var hall_cc = calculate_HallCC(eff_mass, temperature)[1];
	//Plot(Pisarenko_Plot_Obj, hall_cc, seebeck_muVK, 1);

	var temp = temp_range();
	var sc = calculate_CC((eff_mass, hcc));
	Plot(Pisarenko_Plot_Obj, temperature, seebeck, 1);

	/*
	var pisarenko_model = append_arrays(hall_cc, seebeck_muVK);
	Pisarenko_Plot_Obj.data.datasets[1].data = pisarenko_model;
	Pisarenko_Plot_Obj.update();
	*/
}


// Update SPB mobility plot
function Update_Mobility(Mobility_Plot_Obj, eff_mass, temperature, intrinsic_mobility) {
	var hall_cc = calculate_HallCC(eff_mass, temperature)[1];
	var hall_mobility = calculate_HallMobility(intrinsic_mobility*1E4);
	Plot(Mobility_Plot_Obj, hall_cc, hall_mobility, 1);
	/*
	var mobility_model = append_arrays(hall_cc, hall_mobility);
	Mobility_Plot_Obj.data.datasets[1].data = mobility_model;
	Mobility_Plot_Obj.update();
	*/
}


// Update SPB zT plot
function Update_zT(zT_Plot_Obj, eff_mass, temperature, intrinsic_mobility, lat_therm_cond) {
	var zT = calculate_zT(eff_mass, temperature, intrinsic_mobility, lat_therm_cond);
	// var cc = calculate_CC(eff_mass, temperature);
	var hall_cc = calculate_HallCC(eff_mass, temperature)[1];
	Plot(zT_Plot_Obj, hall_cc, zT, 1);
	/*
	var zT_model = append_arrays(hall_cc, zT);
	zT_Plot_Obj.data.datasets[1].data = zT_model;
	zT_Plot_Obj.update();
	*/
}


// Plot data
//both same functions, change

function Plot(Plot_Obj, hall_cc, y_data, plot_index) {

	plot_data = append_arrays(hall_cc, y_data);
	console.log(plot_data);
	Plot_Obj.data.datasets[plot_index].data = plot_data;
	Plot_Obj.update();
}


function Plot(Plot_Obj, temperatureArray, y_dataArray, plot_index) {
    // Assuming temperatureArray and y_dataArray are arrays of the same length
    var plot_data = temperatureArray.map(function(temp, index) {
        return { x: temp, y: y_dataArray[index] };
    });
    console.log(plot_data);
    Plot_Obj.data.datasets[plot_index].data = plot_data;
    Plot_Obj.update();
}

function Plot(Plot_Obj, x_data, y_data, plot_index) {
    // Args:
    //    Plot_Obj:       Canvas object
    //    x_data:         Data to plot in x
    //    y_data:         Data to plot in y
    //    plot_index:     0 for scatter, 1 for line
    var plot_data = [];
    for(var i = 0; i < x_data.length; i++) {
        plot_data.push({ x: x_data[i], y: y_data[i] });
    }
    console.log(plot_data);
    Plot_Obj.data.datasets[plot_index].data = plot_data;
    Plot_Obj.update();
}

function Update_Plots() {
    // Convert slider values from string to number where necessary
    var effMass = parseFloat(effective_mass_slider.value);
    var hcc = parseFloat(hall_cc_slider.value);
    var mobility = parseFloat(mobility_slider.value) * 1E-4; // Assuming conversion factor is necessary
    var kappa = parseFloat(kappa_slider.value);

    Update_Pisarenko(Pisarenko_Plot_Obj, effMass, hcc); // Assume this function now accepts HCC instead of temperature
    Update_Mobility(Mobility_Plot_Obj, effMass, hcc, mobility);
    Update_zT(zT_Plot_Obj, effMass, hcc, mobility, kappa);
}

function hccSliderChanged(hccValue) {
	document.getElementById('HCCSliderValue').txtContent = hccValue;
	Update_Pisarenko(Pisarenko_Plot_Obj, effectiveMassValue, hccValue);
    Update_Mobility(Mobility_Plot_Obj, effectiveMassValue, hccValue, intrinsicMobilityValue);
    Update_zT(zT_Plot_Obj, effectiveMassValue, hccValue, intrinsicMobilityValue, latticeThermalConductivityValue);
}

function hccSliderChanged(hccValue) {
    // Filter the temperatureData for the selected HCC
    var filteredData = this.temperatureData.filter(function(dataPoint) {
        return dataPoint.hcc === Number(hccValue);
    });

    // Map the filtered data to the format expected by your plotting library
    var graphData = filteredData.map(function(dataPoint) {
        return { x: dataPoint.temperature, y: dataPoint.value };
    });

    // Update the chart data and refresh the graph
    updateGraph(graphData);
}
