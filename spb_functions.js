
const k = 1.38E-23;
const e = 1.602E-19;
const h = 6.626E-34;
const me = 9.109E-31;

var eta_values = [];
var fdk0 = [];
var fdk1 = [];
var fdk05 = [];
var fdk05neg = [];
var fdk2 = [];

var seebeck, seebeck_muVK, hall_factor, lorenz, psi;

$(document).ready(function () {
    $("#doi-names").change(function () {
        var value = $(this).val();

        let hcc_options = '';
        var hall_cc = [300, 400, 500];
        for (i = 0; i < hall_cc.length; i++) {
            hcc_options += '<option value="'+hall_cc[i]+'">'+hall_cc[i]+'</option>';
        }
        console.log(hcc_options);
        $("#hall_carrier_concentration").html(hcc_options);
    });
});


fetch('eta_values/FermiDiracIntegrals.csv')
.then(function(response) {
	return response.text()
})
.then(function(csv) {

	csv_lines = csv.split("\n");
	for (var i = 1; i < csv_lines.length-1; i++) {
		csv_line_data = csv_lines[i].split(",");
		eta_values.push( Number(csv_line_data[0]) );
		fdk0.push( Number(csv_line_data[1]) );
		fdk1.push( Number(csv_line_data[2]) );
		fdk05.push( Number(csv_line_data[3]) );
		fdk05neg.push( Number(csv_line_data[4]) );
		fdk2.push( Number(csv_line_data[5]) );
	}
	
	seebeck_arrays = calculate_Seebeck();
	seebeck = seebeck_arrays[0];
	seebeck_muVK = seebeck_arrays[1];

	hall_factor = calculate_HallFactor();
	lorenz = calculate_Lorenz();
	psi = calculate_psi();
})



var arrayBy = 100;

// Calculate an array for the Seebeck
function calculate_Seebeck() {
	var seebeck = [];
	var seebeck_muVK = [];
	for (var i = 0; i < fdk0.length; i=i+arrayBy) {
		var seebeck_value = k/e * (2*fdk1[i]/fdk0[i] - eta_values[i]);
		seebeck.push( seebeck_value )
		seebeck_muVK.push( seebeck_value * 1E6 ); // Convert from V/K to muV/K
	}
	var seebeck_arrays = [];
	seebeck_arrays.push(seebeck);
	seebeck_arrays.push(seebeck_muVK);
	return seebeck_arrays
}


// Calculate an array of carrier concentrations
function calculate_CC(eff_mass, temperature) {
	var cc = [];
	for (var i = 0; i < fdk0.length; i=i+arrayBy) {
		var cc_value = 4*Math.PI * ( 2*eff_mass*me*k*temperature / h**2 )**(3/2) * fdk05[i];
		cc.push( cc_value * 1E-6 ); // Convert from m^-3 to cm^-3
	}
	return cc
}


// Calculate array of Hall factors
function calculate_HallFactor() {
	var hall_factor = [];
	for (var i = 0; i < fdk0.length; i=i+arrayBy) {
		hall_factor.push( 3/2 * fdk05[i]*fdk05neg[i]/2/fdk0[i]**2 );
	}
	return hall_factor
}


// Calculate array of Hall carrier concentrations
function calculate_HallCC(eff_mass, temperature) {
	
	var hall_cc = [];
	var hall_cc_cm3 = [];
	for (var i = 0; i < fdk0.length; i=i+arrayBy) {
		var cc_value = 4*Math.PI * ( 2*eff_mass*me*k*temperature / h**2 )**(3/2) * fdk05[i];
		var hall_factor = 3/2 * fdk05[i]*fdk05neg[i]/2/fdk0[i]**2;
		hall_cc_value = cc_value / hall_factor;
		hall_cc.push(hall_cc_value);
		hall_cc_cm3.push(hall_cc_value*1E-6);
	}

	var hall_cc_arrays = [];
	hall_cc_arrays.push(hall_cc);
	hall_cc_arrays.push(hall_cc_cm3);

	return hall_cc_arrays
}


// Calculate array of Hall mobilities
function calculate_HallMobility(intrinsic_mobility) {
	var hall_mobility = [];
	for (var i = 0; i < fdk0.length; i=i+arrayBy) {
		hall_mobility.push( intrinsic_mobility * fdk05neg[i]/2/fdk0[i] );
	}
	return hall_mobility
}


// Calculate array of Lorenz numbers
function calculate_Lorenz() {
	var lorenz = [];
	for (var i = 0; i < fdk0.length; i=i+arrayBy) {
		lorenz.push( (k/e)**2 * (3*fdk0[i]*fdk2[i] - 4*fdk1[i]**2) / fdk0[i]**2 );
	}
	return lorenz
}


// Calculate Beta (quality factor)
function calculate_beta(eff_mass, temperature, intrinsic_mobility, lat_therm_cond) {
	return intrinsic_mobility * eff_mass**(3/2) * temperature**(5/2) / lat_therm_cond
}


// Calculate array of psi
function calculate_psi() {
	var psi = [];
	for (var i = 0; i < fdk0.length; i=i+arrayBy) {
		psi.push( 8*Math.PI*e/3 * (2*me*k/h**2)**(3/2) * fdk0[i] );
	}
	return psi
}


// Calculate array of zT
function calculate_zT(eff_mass, temperature, intrinsic_mobility, lat_therm_cond) {
	var beta = calculate_beta(eff_mass, temperature, intrinsic_mobility, lat_therm_cond);
	// console.log(beta);
	var zT = [];
	for (var i = 0; i < seebeck.length; i++) {
		zT.push( seebeck[i]**2 / ( lorenz[i] + 1/(psi[i]*beta) ) );
	}
	return zT
}





// Append two arrays to create plottable data
function append_arrays(array1, array2) {

	if (array1.length !== array2.length) {
		console.log("The two arrays must be the same length.");
		return null
	}

	var newArray = [];
	for (var i = 0; i < array1.length; i++) {
		newArray.push( { x: array1[i], y: array2[i] } );
	}

	return newArray
}


