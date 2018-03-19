$("#diffchk")
	.checkbox({
		onChecked: () => {
			$("#diff").show();
			$("#all").hide();
		}
	})

$("#allchk")
.checkbox({
	onChecked: () => {
		console.log("aaa!");
		$("#all").show();
		$("#diff").hide();
	}
})