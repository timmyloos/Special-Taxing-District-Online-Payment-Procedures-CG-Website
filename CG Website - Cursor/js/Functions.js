// Generate transaction code on page load
document.addEventListener('DOMContentLoaded', function() {
    // Initialize district dropdown
    const districtDropdown = document.getElementById('districtDropdown');
    const districtButtons = document.querySelectorAll('.dropdown-item[data-district]');
    const paymentButton = document.getElementById('paymentButton');
    
    districtButtons.forEach(button => {
        button.addEventListener('click', function() {
            const selectedDistrict = this.getAttribute('data-district');
            districtDropdown.textContent = this.textContent;
            
            // Show quantity container when district is selected
            const quantityContainer = document.getElementById('quantityContainer');
            if (quantityContainer) {
                quantityContainer.style.display = 'block';
            }

            // Enable payment button when district is selected
            if (paymentButton) {
                paymentButton.disabled = false;
            }
        });
    });

    // Handle payment button click
    if (paymentButton) {
        paymentButton.addEventListener('click', function() {
            // Get selected district
            const selectedDistrict = districtDropdown.textContent;
            if (selectedDistrict === 'Choose an option') {
                alert('Please select a district before proceeding with payment.');
                return;
            }

            // Get quantity
            const quantity = document.getElementById('quantity').value;
            if (!quantity || quantity < 1 || quantity > 4) {
                alert('Please enter a valid quantity (1-4) before proceeding with payment.');
                return;
            }

            // Calculate total amount (assuming $15.00 per decal)
            const pricePerDecal = 15.00;
            const total = (pricePerDecal * quantity).toFixed(2);
            
            // Create the details parameter
            const details = `${quantity}|${selectedDistrict} - Window Decal|${pricePerDecal.toFixed(2)}`;
            
            // Create the payment URL with parameters
            const baseUrl = 'https://cocgablestaxdist.securepayments.cardpointe.com/pay';
            const params = new URLSearchParams({
                total: total,
                details: details,
                _invalidateCache: Date.now()
            });
            
            // Redirect to payment gateway
            window.location.href = `${baseUrl}?${params.toString()}`;
        });
    }

    // Generate transaction codes for both forms
    const noticeTransactionCode = document.getElementById('noticeTransactionCode');
    const appealsTransactionCode = document.getElementById('appealsTransactionCode');
    
    if (noticeTransactionCode) {
        noticeTransactionCode.value = 'TXN-' + Date.now();
    }
    if (appealsTransactionCode) {
        appealsTransactionCode.value = 'TXN-' + Date.now();
    }

    // Handle Notice of Commencement form submission
    const noticeForm = document.getElementById('noticeForm');
    if (noticeForm) {
        noticeForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Validate all fields
            const name = document.getElementById('noticeName').value.trim();
            const filingFee = document.getElementById('noticeFilingFee').value.trim();
            const pagesFee = document.getElementById('noticePagesFee').value.trim();
            const locationFee = document.getElementById('noticeLocationFee').value.trim();
            if (!name || !filingFee || !pagesFee || !locationFee) {
                alert('Please fill in all fields before submitting the Notice of Commencement.');
                return;
            }
            // Collect form data
            const formData = {
                customerName: name,
                transactionCode: noticeTransactionCode.value,
                filingFee: filingFee,
                pagesFee: pagesFee,
                locationFee: locationFee
            };
            // TODO: Handle form submission (e.g., send to server)
            console.log('Notice of Commencement Form Data:', formData);
            alert('Notice of Commencement form submitted successfully!');
        });
    }

    // Handle Appeals form submission
    const appealsForm = document.getElementById('appealsForm');
    if (appealsForm) {
        appealsForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Validate all fields
            const name = document.getElementById('appealsName').value.trim();
            const filingFee = document.getElementById('appealsFilingFee').value.trim();
            const pagesFee = document.getElementById('appealsPagesFee').value.trim();
            const locationFee = document.getElementById('appealsLocationFee').value.trim();
            const appealsFee = document.getElementById('appealsFee').value.trim();
            if (!name || !filingFee || !pagesFee || !locationFee || !appealsFee) {
                alert('Please fill in all fields before submitting the Appeal.');
                return;
            }
            // Collect form data
            const formData = {
                customerName: name,
                transactionCode: appealsTransactionCode.value,
                filingFee: filingFee,
                pagesFee: pagesFee,
                locationFee: locationFee,
                appealsFee: appealsFee
            };
            // TODO: Handle form submission (e.g., send to server)
            console.log('Appeals Form Data:', formData);
            alert('Appeals form submitted successfully!');
        });
    }
}); 