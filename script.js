$(document).ready(function () {
    $(".navbar-link").on("click", function () {
      // Get the text of the clicked button (e.g., "About", "Resume", etc.)
      var page = $(this).text().trim().toLowerCase();

      // Remove 'active' from all navbar links and pages
      $(".navbar-link").removeClass("active");
      $("[data-page]").removeClass("active");

      // Add 'active' to the clicked navbar link
      $(this).addClass("active");

      // Show the matching article based on data-page attribute
      $("[data-page='" + page + "']").addClass("active");

      // Scroll to top
      window.scrollTo(0, 0);
    });
    $('.info_more-btn[data-sidebar-btn]').on('click', function () {
        $('aside.sidebar[data-sidebar]').toggleClass('active');
    });
  });

//   Contact Form Code
const supabaseUrl = 'https://ggevtmqqmrigishlgmer.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdnZXZ0bXFxbXJpZ2lzaGxnbWVyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg3NjkyNDgsImV4cCI6MjA2NDM0NTI0OH0.fYgVl21onnO7T748_OfQui58-Rsp2pvJoldR75SzVlo';

// Use `supabaseJs` from the global object
const client = supabase.createClient(supabaseUrl, supabaseKey);

const form = document.querySelector('.form');
const submitBtn = document.querySelector('[data-form-btn]');

form.addEventListener('input', () => {
  submitBtn.disabled = !form.checkValidity();
});

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  submitBtn.disabled = true;

  const data = {
    fullname: form.fullname.value,
    email: form.email.value,
    subject: form.subject.value,
    message: form.message.value
  };

  const { error } = await client
    .from('contact_form')
    .insert([data]);

    if (error) {
    alert('Submission failed. Try again.');
    console.error(error);
    } else {
    // Show the popup
    document.getElementById('thankyou-popup').classList.remove('hidden');

    // Reset form and disable button
    form.reset();
    submitBtn.disabled = true;
    }
});
document.querySelector('.close-popup').addEventListener('click', () => {
    document.getElementById('thankyou-popup').classList.add('hidden');
  });
  
  