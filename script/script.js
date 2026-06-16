let interviewList = [];
let rejectedList = [];
let currentStatus = "all";

let total = document.getElementById("total");
let rejectedCount = document.getElementById("rejectedCount");
let interviewCount = document.getElementById("interviewCount");

const allFilterBtn = document.getElementById("all-filter-btn");
const InterviewFilterBtn = document.getElementById("interview-filter-btn");
const RejectedFilterBtn = document.getElementById("rejected-filter-btn");

const allCardSection = document.getElementById("allCard");

// const jobs = document.getElementById("jobs");
// const totalJobs = allCardSection.children.length;

const mainContainer = document.querySelector("main");
const filterSection = document.getElementById("filtered-section");

// const jobs = document.getElementById("jobs");
// const totalJobs = allCardSection.children.length;

function calculateCount() {
  total.innerText = allCardSection.children.length;
  interviewCount.innerText = interviewList.length;
  rejectedCount.innerText = rejectedList.length;

  // const processedJobs = interviewList.length + rejectedList.length;

  // jobs.innerText = `${processedJobs} of ${totalJobs} jobs`;
}

calculateCount();

// step 1
function toggleStyle(id) {
  //adding gray bg for all
  allFilterBtn.classList.add("bg-gray-300", "text-black");
  InterviewFilterBtn.classList.add("bg-gray-300", "text-black");
  RejectedFilterBtn.classList.add("bg-gray-300", "text-black");

  //if any button has blue then remove
  allFilterBtn.classList.remove("bg-blue-700", "text-white");
  InterviewFilterBtn.classList.remove("bg-blue-700", "text-white");
  RejectedFilterBtn.classList.remove("bg-blue-700", "text-white");

  //   console.log(id);

  const selected = document.getElementById(id);
  currentStatus = id;
  //   console.log(selected);

  //adding bg gray for current button
  selected.classList.remove("bg-gray-300", "text-black");
  selected.classList.add("bg-blue-700", "text-white");

  // step 1 finish

  // file show koraisi
  // step 4
  // filtering
  if (id == "interview-filter-btn") {
    allCardSection.classList.add("hidden");
    filterSection.classList.remove("hidden");
    renderInterview();
  } else if (id == "all-filter-btn") {
    allCardSection.classList.remove("hidden");
    filterSection.classList.add("hidden");
  } else if (id == "rejected-filter-btn") {
    allCardSection.classList.add("hidden");
    filterSection.classList.remove("hidden");
    renderRejecting();
  }
}

// step 2 start
mainContainer.addEventListener("click", function (event) {
  // DELETE BUTTON
  if (event.target.closest(".btn-delete")) {
    const card = event.target.closest(".card");

    const plantName = card.querySelector(".plantName").innerText;

    // Remove from interview list
    interviewList = interviewList.filter(
      (item) => item.plantName !== plantName
    );

    // Remove from rejected list
    rejectedList = rejectedList.filter((item) => item.plantName !== plantName);

    // Remove card from DOM
    card.remove();

    calculateCount();

    return;
  }

  if (event.target.classList.contains("interview-btn")) {
    const parentNode = event.target.parentNode.parentNode;

    const plantName = parentNode.querySelector(".plantName").innerText;
    const latinName = parentNode.querySelector(".latinName").innerText;
    const light = parentNode.querySelector(".light").innerText;
    const status = parentNode.querySelector(".status").innerText;
    const notes = parentNode.querySelector(".notes").innerText;

    parentNode.querySelector(".status").innerText = "Interview";

    const cardInfo = {
      plantName,
      latinName,
      light,
      status: "Interview",
      notes,
    };

    const plantExist = interviewList.find(
      (item) => item.plantName == cardInfo.plantName
    );

    if (!plantExist) {
      interviewList.push(cardInfo);
    }

    // step 2 finish

    rejectedList = rejectedList.filter(
      (item) => item.plantName != cardInfo.plantName
    );

    if (currentStatus == "rejected-filter-btn") {
      renderRejecting();
    }
    calculateCount();
  } else if (event.target.classList.contains("rejected-btn")) {
    const parentNode = event.target.parentNode.parentNode;

    const plantName = parentNode.querySelector(".plantName").innerText;
    const latinName = parentNode.querySelector(".latinName").innerText;
    const light = parentNode.querySelector(".light").innerText;
    const status = parentNode.querySelector(".status").innerText;
    const notes = parentNode.querySelector(".notes").innerText;

    parentNode.querySelector(".status").innerText = "Rejected";

    const cardInfo = {
      plantName,
      latinName,
      light,
      status: "Rejected",
      notes,
    };

    const plantExist = rejectedList.find(
      (item) => item.plantName == cardInfo.plantName
    );

    if (!plantExist) {
      rejectedList.push(cardInfo);
    }

    interviewList = interviewList.filter(
      (item) => item.plantName != cardInfo.plantName
    );

    if (currentStatus == "interview-filter-btn") {
      renderInterview();
    }

    calculateCount();
  }
});

// step 3 html file create
function renderInterview() {
  filterSection.innerHTML = "";

  for (let inter of interviewList) {
    console.log(inter);
    let div = document.createElement("div");
    div.innerHTML = `
    <!-- card - 01 -->
        <div class="card flex justify-between border p-8 rounded-2xl space-y-6 mt-6">
          <!-- main part - 1 -->
          <div class="space-y-6">
            <!-- part - 01 -->
            <div>
              <p class="plantName">${inter.plantName}</p>
              <p class="latinName">${inter.latinName}</p>
            </div>

            <!-- part - 2 -->
            <div>
              <p class="light">${inter.light}</p>
            </div>
            <!-- part - 3 -->
            <p class="status">${inter.status}</p>
            <p class="notes">
              ${inter.notes}
            </p>

            <div class="flex gap-5">
              <button class="interview-btn text-green-600 border-2 px-2 py-2">
                Interview
              </button>
              <button class="rejected-btn text-red-600 border-2 px-2 py-2">
                Rejected
              </button>
            </div>
          </div>
          <!-- main part - 2 -->
          <div>
            <button class="btn-delete border-2 rounded-full px-2 py-2">
              <i class="fa-solid fa-trash"></i>
            </button>
          </div>
        </div>
    `;
    filterSection.appendChild(div);
  }
}

function renderRejecting() {
  filterSection.innerHTML = "";

  for (let reject of rejectedList) {
    console.log(reject);
    let div = document.createElement("div");
    div.innerHTML = `
    <!-- card - 01 -->
        <div class="card flex justify-between border p-8 rounded-2xl space-y-6 mt-6">
          <!-- main part - 1 -->
          <div class="space-y-6">
            <!-- part - 01 -->
            <div>
              <p class="plantName">${reject.plantName}</p>
              <p class="latinName">${reject.latinName}</p>
            </div>

            <!-- part - 2 -->
            <div>
              <p class="light">${reject.light}</p>
            </div>
            <!-- part - 3 -->
            <p class="status">${reject.status}</p>
            <p class="notes">
              ${reject.notes}
            </p>

            <div class="flex gap-5">
              <button class="interview-btn text-green-600 border-2 px-2 py-2">
                Interview
              </button>
              <button class="rejected-btn text-red-600 border-2 px-2 py-2">
                Rejected
              </button>
            </div>
          </div>
          <!-- main part - 2 -->
          <div>
            <button class="btn-delete border-2 rounded-full px-2 py-2">
              <i class="fa-solid fa-trash"></i>
            </button>
          </div>
        </div>
    `;
    filterSection.appendChild(div);
  }
}
