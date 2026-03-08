/* ------------------------------ issue tracker ----------------------------- */

// Step: 3.1 make arr for two state
let openList = [];
let closeList = [];
let currentStatus = 'all-tab'

// console.log(openList)
// console.log(closeList)

//* setp:1.2 get issues container
const issuesContainer = document.getElementById('issue-container')


// setp:2 get total issue id
const totalIssue = document.getElementById('total-issue')
// setp:2.1 count total issuesData


const countIssue = () => {
    
    if (currentStatus === 'open-tab') {
        totalIssue.innerText = openList.length;
    } else if (currentStatus === 'closed-tab') {
        totalIssue.innerText = closeList.length;
    } else if(currentStatus === 'all-tab') {
        totalIssue.innerText = openList.length + closeList.length
    }
}

// step:3.1 get tab btns
const allTabBtn = document.getElementById('all-tab');
const openTabBtn = document.getElementById('open-tab');
const closedTabBtn = document.getElementById('closed-tab');


// setp:3 toggle tab btn 
const toggle = (id) => {
    // console.log(id, "btn clicked")

    // add all text color
    allTabBtn.classList.add('text-color-gray');
    openTabBtn.classList.add('text-color-gray');
    closedTabBtn.classList.add('text-color-gray');

    // removing all btn bg color and text color
    allTabBtn.classList.remove('btn-primary', 'text-white');
    openTabBtn.classList.remove('btn-primary', 'text-white');
    closedTabBtn.classList.remove('btn-primary', 'text-white');

    // get id from parameter
    const selected = document.getElementById(id)

    // adding & removing text color and add bg + text color for current button
    selected.classList.remove('text-color-gray')
    selected.classList.add('btn-primary', 'text-white');

    // update current status 
    currentStatus = id

    countIssue()
    displayFilterIssues()
}

// console.log(currentStatus)

//* setp:1 ==> get all issue list
const loadIssues = async () => {
    const url = 'https://phi-lab-server.vercel.app/api/v1/lab/issues';
    const res = await fetch(url);
    const issuesData = await res.json();
    // console.log(issuesData.data)
    displayIssues(issuesData.data)
}
loadIssues()


// {
//     "id": 47,
//     "title": "Add code syntax highlighting",
//     "description": "Implement syntax highlighting for code blocks in comments and descriptions.",
//     "status": "open",
//     "labels": [
//         "enhancement",
//         "good first issue"
//     ],
//     "priority": "low",
//     "author": "syntax_simon",
//     "assignee": "",
//     "createdAt": "2024-01-25T11:00:00Z",
//     "updatedAt": "2024-01-25T11:00:00Z"
// }

//* step:1.1 ==> display all issues in issues card container
const displayIssues = (issues) => {

    

    // step:1.3 display every issues 
    issues.forEach(issue => {
        // console.log(issue)

        if (issue.status === 'open') {
            openList.push(issue)
        } else if (issue.status === 'closed') {
            closeList.push(issue)
        }

        const issuesCard = document.createElement('div');
        issuesCard.className = `card p-0 bg-white border-t-3 ${issue.status === 'open' ? "border-t-[#00A96E]" : "border-t-[#A855F7]"}  border border-[#EFEFEF] shadow rounded-sm`;

        issuesCard.setAttribute("data-status", issue.status);
        issuesCard.innerHTML = `
            <div class="p-4 space-y-3">
                <div class="flex justify-between items-center">
                    <img src="${issue.status === 'open' ? "assets/Open-Status.png" : "assets/Closed-Status.png"}" alt="">
                    <div
                        class="badge badge-soft badge-error ${issue.priority === 'high' ? 'bg-[#FEECEC] text-[#EF4444]' : issue.priority === 'medium' ? 'bg-[#FFF6D1] text-[#F59E0B]' : 'bg-[#EEEFF2] text-[#9CA3AF]'} font-medium  uppercase w-20">
                        ${issue.priority}</div>
                </div>

                <div class="space-y-2">
                    <h2 class="text-color-main font-semibold">${issue.title}</h2>
                    <p class="text-color-gray text-sm line-clamp-2">${issue.description}</p>
                    <div class="flex flex-wrap gap-1 my-4 text-xs">
                        <div
                            class="badge border border-[#FECACA] bg-[#FEECEC] font-medium text-[#EF4444] uppercase rounded-full ${issue.labels[0] ? '' : 'hidden'}">
                            <i class="fa-solid fa-bug"></i>${issue.labels[0]}</div>
                        <div
                            class="badge border border-[#FDE68A] bg-[#FFF8DB] font-medium text-[#D97706] uppercase rounded-full whitespace-nowrap ${issue.labels[1] ? '' : 'hidden'}">
                            <i class="fa-solid fa-life-ring "></i>${issue.labels[1]}</div>
                    </div>
                </div>

                <div class="border-t border-[#E4E4E7] p-4 space-y-2">
                    <p class="text-color-gray text-sm">#${issue.id} by ${issue.author}</p>
                    <p class="text-color-gray text-sm">${new Date(issue.createdAt).toLocaleDateString()}</p>
                </div>
            </div>
        `
        issuesContainer.append(issuesCard)
        countIssue()
    });
}


const displayFilterIssues = () => {
    const cards = document.querySelectorAll("#issue-container .card");

    cards.forEach(card => {
        const status = card.getAttribute("data-status");

        if (currentStatus === "all-tab") {
            card.classList.remove("hidden");
        }else if (currentStatus === "open-tab") {
            if (status === "open") {
                card.classList.remove("hidden");
            } else {
                card.classList.add("hidden");
            }
        }else if (currentStatus === "closed-tab") {
            if (status === "closed") {
                card.classList.remove("hidden");
            } else {
                card.classList.add("hidden");
            }
        }
    });

};