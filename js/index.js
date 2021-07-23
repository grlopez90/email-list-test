const formRef = document.getElementById("email-form");
const postURL = 'https://api.staging.fourthwall.com/api/mailing-list';

function submitEmail(e) {
    e.preventDefault();

    const emailInput = document.getElementById("email").value;
    const wrapper = document.getElementById("wrapper");
    const errorMsg = document.getElementById("error-msg");

    // Allows some special characters before the domain part of the email
    // but not in the domain part    
    const mailformat = /^[a-zA-Z0-9.!#$%&_{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (!emailInput || !mailformat.test(emailInput)) {
        // Set the wrapper border to red, and show the error message
        wrapper.classList.add("has-error");
        errorMsg.classList.add("visible");
        return;
    }

    //Remove the error indicators
    wrapper.classList.remove("has-error");
    errorMsg.classList.remove("visible");

    fetch(postURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-ShopId': 'sh_9f57832f-456b-44f3-888f-8a370b155a18'
        },
        body: JSON.stringify({ email: emailInput })
    })
        .then((response) => response.json())
        .then(() => {
            alert('Thank you for joining!');
        })
        .catch(() => {
            alert('An error has ocurred.');
        });
}

formRef.addEventListener("submit", submitEmail);