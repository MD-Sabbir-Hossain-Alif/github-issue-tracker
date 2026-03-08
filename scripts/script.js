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


//* manage loader
const loader = document.getElementById("loader");

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


// setp:5 display issue details 
//* function Load Word Detail
const loadIssueDetail = async (id) => {
    const url = `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`;
    const res = await fetch(url);
    const details = await res.json();
    displayIssueDetail(details.data);
    // console.log(details.data)
}


const displayIssueDetail = (issue) => {
    // console.log('modal clicked');

//     {
//     "id": 3,
//     "title": "Update README with installation instructions",
//     "description": "The README file needs better installation instructions for new contributors.",
//     "status": "closed",
//     "labels": [
//         "documentation"
//     ],
//     "priority": "low",
//     "author": "mike_docs",
//     "assignee": "sarah_dev",
//     "createdAt": "2024-01-10T08:00:00Z",
//     "updatedAt": "2024-01-12T16:45:00Z"
// }

    const detailsContainer = document.getElementById('details-container');
    detailsContainer.innerHTML = `
        <div>
            <h3 class="text-color-main text-2xl font-bold mb-2">${issue.title}</h3>
            <div class="flex flex-wrap gap-1"> 
                <span class="badge ${issue.status === 'open' ? 'bg-[#00A96E]' : issue.status === 'closed' ? 'bg-[#A855F7]' : ''}  font-medium text-white p-2 rounded-full">
                </i>${issue.status === 'open' ? 'Opened' : issue.status === 'closed' ? 'Closed' : ''}
                </span>
                
                <p class="text-color-gray"> 
                &#8226; Opened by ${issue.author} &#8226; ${new Date(issue.createdAt).toLocaleDateString()}
                </p>
            </div>
        </div>

        <div class="flex flex-wrap gap-1 my-4 text-xs">
                <div
                    class="badge border border-[#FECACA] bg-[#FEECEC] font-medium text-[#EF4444] uppercase rounded-full ${issue.labels[0] ? '' : 'hidden'}">
                    <i class="fa-solid fa-bug"></i>${issue.labels[0]}</div>
                <div
                    class="badge border border-[#FDE68A] bg-[#FFF8DB] font-medium text-[#D97706] uppercase rounded-full whitespace-nowrap ${issue.labels[1] ? '' : 'hidden'}">
                <i class="fa-solid fa-life-ring "></i>${issue.labels[1]}</div>
        </div>

        <div>
            <p class="text-color-gray">${issue.description}</p>
        </div>

        <div class="grid grid-cols-2 gap-2.5 p-4 bg-[#F8FAFC] rounded-lg">
            <div>
                <p class="text-color-gray">Assignee:</p>
                <p class="text-color-main font-semibold">${issue.author}</p>
            </div>
            <div>
                <p class="text-color-gray">Priority:</p>
                <div
                    class="badge py-3 ${issue.priority === 'high' ? 'bg-[#EF4444]' : issue.priority === 'medium' ? 'bg-[#F59E0B]' : 'bg-[#9CA3AF]'} text-white font-medium rounded-full uppercase w-20">
                    ${issue.priority}
                </div>
        </div>

        `

    document.getElementById('my_modal_5').showModal()
}


//* setp:1 ==> get all issue list
const loadIssues = async () => {
    loader.classList.remove("hidden");

    // reset arrays
    openList = [];
    closeList = [];

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

    loader.classList.add("hidden");

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
                    <h2 onclick="loadIssueDetail(${issue.id})" class="text-color-main font-semibold cursor-pointer">${issue.title}</h2>
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
    });
    countIssue()
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

// step:6 search functionality

document.getElementById('btn-search').addEventListener('click', () => {
    const input = document.getElementById('input-search')
    const searchValue = input.value.trim().toLowerCase()
    // console.log(searchValue)
    loader.classList.remove("hidden");
    fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${searchValue}`)
        .then((res) => res.json())
        .then(data => {
            const findIssue = data.data

            issuesContainer.innerHTML = '';
            openList = [];
            closeList = [];
            // console.log(filterIssue)
            displayIssues(findIssue)
        })
})