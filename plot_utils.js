

// Update SPB Pisarenko plot
function Update_Pisarenko(Pisarenko_Plot_Obj, eff_mass, temperature) {
	//var cc = calculate_CC(eff_mass, temperature);
	var hall_cc = calculate_HallCC(eff_mass, temperature)[1];
	Plot(Pisarenko_Plot_Obj, hall_cc, seebeck_muVK, 1);
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
function Plot(Plot_Obj, hall_cc, y_data, plot_index) {
	// Args:
	//	Plot_Obj: 		Canvas object
	//	hall_cc: 		Hall carrier concentration array
	//	y_data: 		Data to plot in y
	// 	plot_index: 	0 for scatter, 1 for line
	plot_data = append_arrays(hall_cc, y_data);
	console.log(plot_data);
	Plot_Obj.data.datasets[plot_index].data = plot_data;
	Plot_Obj.update();
}





