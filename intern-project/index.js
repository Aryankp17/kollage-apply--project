async function main(){

    const data= await fetch('lpu_punjab_university.json');
    const res = await data.json();
    console.log(res);
    

    res.courses.forEach(element => {
        const courseList = document.querySelector('.modle');
        const div = document.createElement('div');
        div.className = 'fees-info';
       
            div.innerHTML=`
                
                    <h5>${element.code}</h5>
                    <p>₹${element.first_year_fee_inr.min} - ₹${element.first_year_fee_inr.max}</p>
                `
        courseList.appendChild(div);
        
    });


    const courseWiseFeesButton = document.querySelector('.course-waise.fees');
    courseWiseFeesButton.addEventListener('click',function(){
        const modlepopup = document.querySelector('.modle-popup');
        modlepopup.style.display = 'flex';
        modlepopup.style.transition = 'all 0.3s ease-in-out'; 
    })
    const closeButton = document.querySelector('.modle-popup img');
    closeButton.addEventListener('click', function() {
        const modlepopup = document.querySelector('.modle-popup');
        modlepopup.style.display = 'none';
        modlepopup.style.transition = 'all 0.3s ease-in-out'; 
    });

    const navapply = document.querySelector('.nav-apply-now');
    const mainapply = document.querySelector('.main-apply-now');

    mainapply.addEventListener('click',function(){
        const formsection = document.querySelector('.form-section');
        formsection.scrollIntoView({behavior:"smooth"});
    })
    navapply.addEventListener('click',function(){
        const formsection = document.querySelector('.form-section');
        formsection.scrollIntoView({behavior:"smooth"});
    })
    const leadform = document.querySelector('.lead-form');
    const formstatus = document.querySelector('.form-status');

    // Clear any existing status when the page loads or is restored from the bfcache
    if (formstatus) {
        formstatus.textContent = "";
        window.addEventListener('pageshow', (event) => {
            formstatus.textContent = "";
        });
    }

    if (leadform) {
        leadform.addEventListener("submit", async (e) => {
            e.preventDefault();
            if (formstatus) formstatus.textContent = "";

            const payload = {
                fullName: document.getElementById("name").value.trim(),
                email: document.getElementById("email").value.trim(),
                phone: document.getElementById("number").value.trim(),
                state: document.getElementById("state").value,
                course: document.getElementById("course").value,
                intakeYear: document.getElementById("intake-year").value,
                consent: document.getElementById("consent").checked
            };

            if (payload.phone.length !== 10 || isNaN(payload.phone)) {
                if (formstatus) formstatus.textContent = "Please enter a valid 10-digit phone number.";
                return;
            }

            try {
                const res = await fetch("https://92c6dc5a3fc40def72590ce4d2d2d957.m.pipedream.net", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload)
                });

                if (res.ok) {
                    if (formstatus) formstatus.textContent = "Form submitted successfully!";
                    leadform.reset();
                } else {
                    if (formstatus) formstatus.textContent = "Something went wrong. Please try again.";
                }
            } catch (err) {
                console.error(err);
                if (formstatus) formstatus.textContent = "Network error. Please check your connection.";
            }
        });
    }
           
}
main();
