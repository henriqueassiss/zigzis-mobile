import colors from "../styles/colors";

export function formatDate(datetime: string) {
	const date = datetime.split(" ")[0].split("/");
	const time = datetime.split(" ")[1].split(":");

	const dateObject = {
		year: parseInt(date[2]),
		month: parseInt(date[1]) - 1,
		day: parseInt(date[0]),
		hour: parseInt(time[0]),
		minute: parseInt(time[1]),
		second: parseInt(time[2]),
	};

	const dateSPString = new Date(
		Date.UTC(
			dateObject.year,
			dateObject.month,
			dateObject.day,
			dateObject.hour,
			dateObject.minute,
			dateObject.second
		)
	).toLocaleString("pt-BR", { timeZone: "America/São_Paulo" });

	const dateSP = new Date(dateSPString);

	const dateSPObject = {
		year: dateSP.getFullYear(),
		month: dateSP.getMonth(),
		day: dateSP.getDate(),
		hour:
			dateSP.getHours() < 10
				? "0" + dateSP.getHours()
				: dateSP.getHours(),
		minute:
			dateSP.getMinutes() < 10
				? "0" + dateSP.getMinutes()
				: dateSP.getMinutes(),
		second:
			dateSP.getSeconds() < 10
				? "0" + dateSP.getSeconds()
				: dateSP.getSeconds(),
	};

	const formattedDate = `${dateSPObject.day}/${dateSPObject.month + 1}/${
		dateSPObject.year
	} ${dateSPObject.hour}:${dateSPObject.minute}:${dateSPObject.second}`;

	return { month: dateSPObject.month, formattedDate };
}

export const arrayMonthNumber = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

export const dashBoard = {
	allUsedCount: "",
	allStockedTimes: "",
	allUsedCountByMonth: arrayMonthNumber,
	allStockedTimesByMonth: arrayMonthNumber,
};

export const allDispenserDetailsDashboard = {
	name: "",
	allUsedCount: 0,
	allStockedTimes: 0,
	color: "",
	legendFontColor: "",
	legendFontSize: 0,
};

export const months = [
	"Jan",
	"Fev",
	"Mar",
	"Abr",
	"Mai",
	"Jun",
	"Jul",
	"Ago",
	"Set",
	"Out",
	"Nov",
	"Dez",
];

export const localInfo = [
	{
		local: "Sala",
		color: colors.white,
	},
	{
		local: "Banheiro",
		color: colors.green_bright,
	},
	{
		local: "Corredor",
		color: colors.green_light,
	},
	{
		local: "Elevador",
		color: colors.green,
	},
	{
		local: "Quarto",
		color: colors.green_dark,
	},
];
