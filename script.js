// Select elements from the HTML
const queueForm = document.getElementById('queueForm');
const queueList = document.getElementById('queueList');
const estimatedWait = document.getElementById('estimatedWait');

// Queue data structure to store students
let queue = [];

// Average time per student (in minutes) for wait time calculation
const avgTimePerStudent = 5;

// Function to update the display of the queue
function updateQueueDisplay() {
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

    // Populate the queue list
    queue.forEach((student, index) => {
        const listItem = document.createElement('li');
        listItem.className = 'py-2';

        // Display queue position and student's name and topic
        listItem.innerHTML = `<strong>${index + 1}.</strong> ${student.name} - ${student.topic}`;

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

    // Get the student's name and topic from the form
    const name = document.getElementById('name').value;
    const topic = document.getElementById('topic').value;

    // Add the student to the queue
    queue.push({ name, topic });

    // Clear the form fields
    document.getElementById('name').value = '';
    document.getElementById('topic').value = '';

    // Update the queue display
    updateQueueDisplay();
}

// Attach event listener to the form
queueForm.addEventListener('submit', joinQueue);
