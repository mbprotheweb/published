async function fetchData(fetchBody) {
    try {
        const response = await fetch("https://yedei.evero.com/DAFacility/AttendanceRoster/get_FAC_DayAttendance_Approve_All_ClientID_StartStop", {
            headers: {
                accept: "application/json, text/plain, */*",
                "accept-language": "en-US,en;q=0.9",
                "content-type": "application/json;charset=UTF-8",
                "sec-ch-ua": "\"Google Chrome\";v=\"117\", \"Not;A=Brand\";v=\"8\", \"Chromium\";v=\"117\"",
                "sec-ch-ua-mobile": "?0",
                "sec-ch-ua-platform": "\"Windows\"",
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "same-origin",
            },
            referrer: "https://yedei.evero.com/DAFacility/AttendanceRoster/Index?SiteID=1696&CallFrom=DAFacility",
            referrerPolicy: "no-referrer-when-downgrade",
            body: JSON.stringify(fetchBody),
            method: "POST",
            mode: "cors",
            credentials: "include",
        });

        if (!response.ok) {
            throw new Error("Network response was not ok");
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Fetch error:", error);
        throw error;
    }
}

// Difffrence in days between 2 days
function diffInDays(date1, date2) {
    const oneDay = 1000 * 60 * 60 * 24;
    const diffInMs = date2 - date1;
    const diffInDays = diffInMs / oneDay;
    return diffInDays;
}

// Get program id
var program = document.querySelector("#ProgramDDL");
var programValue = Object.entries(program).find(a => a[0].startsWith("jQuery") && !!a[1].$selectController)[1].$selectController.readValue();
var programId = programValue.TherapyID;
var programName = programValue.TherapyType;
if (!programId) {
    alert("Please select a valid program.");
    throw Error("Please select a valid program.");
}
var siteID = 1696;

// Get Dates
var startDate = undefined;
var endDate = undefined;
do {
    if (!!startDate || !!endDate) {
        alert("Not a valid date, Please try again.\n Needs to be less then 90 days");
    }
    // Get Start Date
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    do {
        var startDatePromp = prompt("Enter Start Date", startOfMonth.toLocaleDateString());
        startDate = new Date(Date.parse(startDatePromp));
    } while (!startDate || startDate == "Invalid Date" || !startDate.toISOString());
    // console.log(startDate);

    // Get end Date
    const today = new Date();
    const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    do {
        var endDatePromp = prompt("Enter End Date", endOfMonth.toLocaleDateString());
        endDate = new Date(endDatePromp);
    } while (!endDate || endDate == "Invalid Date" || !endDate.toISOString())
    // console.log(endDate);
} while (diffInDays(startDate, endDate) > 91);

// Example usage:
const requestBody = {
    SiteID: siteID,
    ClientID: 0,
    TherapyID: programId,
    StartDate: startDate.toISOString(),
    EndDate: endDate.toISOString(),
    filterType: "All",
    ClassroomID: 0,
    CaseManagerEmpID: 0,
    ClientServiceGroupID: 0,
    RosterGetListView: "all",
    RosterViewStyle: "roster",
};

(async () => {
    try {
        const data = await fetchData(requestBody);
        // Handle the response data here
        console.log(data);
        var newArray = data.map(row => {
            var { ClientName, Staff, TimeStartText, TimeEndText, NoServicesDoneBillable, ActualDuration, BusClientLogDateString } = row;
            return [ClientName, Staff, programName, BusClientLogDateString, TimeStartText, TimeEndText, ActualDuration, NoServicesDoneBillable];
        });
        var ready = newArray.map(row => row.join("	")).join("\n");
        await navigator.clipboard.writeText(ready);
        alert(newArray.length + " Rows Copied to clipboard!\nGo to an excel/google sheet and press CTRL + V to paste. ");
    } catch (error) {
        // Handle any errors here
        console.error(error);
    }
})();


