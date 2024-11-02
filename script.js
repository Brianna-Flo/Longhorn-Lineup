// Select elements from the HTML
const queueForm = document.getElementById('queueForm');
const queueList = document.getElementById('queueList');
const estimatedWait = document.getElementById('estimatedWait');
const leaveQueueButton = document.getElementById('leaveQueueButton');
const leaveNameInput = document.getElementById('leaveName');
const priorityCheckbox = document.getElementById('priority'); // Select the priority checkbox

// Queue data structure to store students
let queue = [];

// Average time per student (in minutes) for wait time calculation
const avgTimePerStudent = 5;

// Store the user's name to identify their position in the queue
let userName = '';

// Function to request permission for browser notifications
function requestNotificationPermission() {
    if ('Notification' in window && Notification.permission !== 'granted') {
        Notification.requestPermission().then(permission => {
            if (permission === 'granted') {
                console.log("Notification permission granted.");
            } else {
                console.log("Notification permission denied.");
            }
        });
    }
}

// Function to update the display of the queue
function updateQueueDisplay() {
    console.log("Updating queue display..."); // Debugging line
    console.log("Current queue:", queue); // Log the current queue

    // Clear the current list
    queueList.innerHTML = '';

    // Check if the queue is empty
    if (queue.length === 0) {
        const emptyMessage = document.createElement('li');
        emptyMessage.textContent = "Queue is empty...";
        emptyMessage.className = 'text-center text-gray-500';
        queueList.appendChild(emptyMessage);
        estimatedWait.textContent = '0 min';
        return;
    }

    // Sort the queue: prioritize students with "priority" set to true
    const sortedQueue = [...queue].sort((a, b) => b.priority - a.priority);

    // Populate the queue list with sorted queue
    sortedQueue.forEach((student, index) => {
        const listItem = document.createElement('li');
        listItem.className = 'py-2';

        // Display queue position, student's name, and topic
        listItem.innerHTML = `<strong>${index + 1}.</strong> ${student.name} - ${student.topic} ${student.priority ? "(Priority)" : ""}`;

        // Highlight the student if they're first in the queue
        if (index === 0) {
            listItem.classList.add('highlight');
        }

        queueList.appendChild(listItem);
    });

    // Update the estimated wait time for the first student
    const estimatedTime = queue.length * avgTimePerStudent;
    estimatedWait.textContent = `${estimatedTime} min`;
}

// Function to handle form submission
function joinQueue(event) {
    event.preventDefault(); // Prevent form from refreshing the page

    // Request notification permission
    requestNotificationPermission();

    // Get the student's name, topic, and priority status from the form
    const name = document.getElementById('name').value.trim();
    const topic = document.getElementById('topic').value.trim();
    const priority = priorityCheckbox.checked; // Get priority status

    console.log("Joining queue:", name, topic, priority); // Debugging line

    // Check if name or topic is missing
    if (!name || !topic) {
        alert("Please enter both a name and a topic.");
        return;
    }

    // Store the user's name if this is the first time joining
    if (!userName) {
        userName = name; // Save the name to identify the user in the queue
    }

    // Add the student to the queue, including their priority status
    queue.push({ name, topic, priority });
    console.log("Student added to queue:", { name, topic, priority }); // Debugging line

    // Clear the form fields
    document.getElementById('name').value = '';
    document.getElementById('topic').value = '';
    priorityCheckbox.checked = false; // Reset the priority checkbox

    // Update the queue display
    updateQueueDisplay();
}

// Function to leave the queue by name
function leaveQueue() {
    // Get the name to leave from the input field
    const nameToLeave = leaveNameInput.value.trim();

    console.log("Leaving queue:", nameToLeave); // Debugging line

    // Find the index of the student in the queue
    const index = queue.findIndex(student => student.name.toLowerCase() === nameToLeave.toLowerCase());

    if (index !== -1) {
        // If the student is found, remove them from the queue
        queue.splice(index, 1);
        leaveNameInput.value = ''; // Clear the input field
        updateQueueDisplay(); // Update the display
    } else {
        // If the student is not found, alert the user
        alert(`Cannot find name: ${nameToLeave}`);
    }
}

// Attach event listener to the form
queueForm.addEventListener('submit', joinQueue);

// Attach event listener to the leave queue button
leaveQueueButton.addEventListener('click', leaveQueue);

// (Optional) Attach event listener to the clear queue button if you want to implement it
document.getElementById('clearQueueButton').addEventListener('click', () => {
    queue = []; // Clear the queue array
    updateQueueDisplay(); // Update the display
});
