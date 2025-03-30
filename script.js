const wrapper = document.querySelector('.wrapper')
const registerLink = document.querySelector('.register-link')
const loginLink = document.querySelector('.login-link')
const passwordInputs = document.querySelectorAll('input[type="password"]')
const passwordToggles = document.querySelectorAll('.password-toggle')
const forms = document.querySelectorAll('form')
const submitButtons = document.querySelectorAll('form button[type="submit"]')

// Toggle between login and register forms
registerLink.onclick = (e) => {
    e.preventDefault()
    wrapper.classList.add('active')
}

loginLink.onclick = (e) => {
    e.preventDefault()
    wrapper.classList.remove('active')
}

// Password visibility toggle
passwordToggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
        const input = toggle.parentElement.querySelector('input')
        const isPassword = input.type === 'password'
        
        input.type = isPassword ? 'text' : 'password'
        toggle.classList.toggle('bxs-show')
        toggle.classList.toggle('bxs-hide')
    })
})

// Form validation
forms.forEach(form => {
    form.addEventListener('submit', async (e) => {
        e.preventDefault()
        const submitBtn = form.querySelector('button[type="submit"]')
        const inputs = form.querySelectorAll('.input-box input')
        let isValid = true
        
        // Reset all errors
        form.querySelectorAll('.input-box').forEach(box => {
            box.classList.remove('invalid')
        })
        
        // Validate each input
        inputs.forEach(input => {
            const inputBox = input.parentElement
            const errorMsg = inputBox.querySelector('.error-message')
            
            if (!input.value.trim()) {
                inputBox.classList.add('invalid')
                errorMsg.textContent = 'This field is required'
                isValid = false
            } else if (input.type === 'email' && !validateEmail(input.value)) {
                inputBox.classList.add('invalid')
                errorMsg.textContent = 'Please enter a valid email'
                isValid = false
            } else if (input.id === 'reg-password' && input.value.length < 8) {
                inputBox.classList.add('invalid')
                errorMsg.textContent = 'Password must be at least 8 characters'
                isValid = false
            }
        })
        
        if (isValid) {
            // Simulate form submission
            submitBtn.classList.add('loading')
            
            // In a real app, you would send data to server here
            await new Promise(resolve => setTimeout(resolve, 1500))
            
            submitBtn.classList.remove('loading')
            
            // Show success message (in a real app, you'd redirect or show a proper message)
            alert(form.classList.contains('login') ? 'Login successful!' : 'Registration successful!')
        }
    })
})

// Password strength indicator
const passwordStrength = document.querySelector('#reg-password')
if (passwordStrength) {
    passwordStrength.addEventListener('input', function() {
        const strengthBar = document.querySelector('.strength-bar')
        const strengthText = document.querySelector('.strength-text')
        const segments = strengthBar.querySelectorAll('.bar-segment')
        const password = this.value
        let strength = 0
        
        // Reset
        segments.forEach(segment => segment.style.background = '#ddd')
        strengthText.textContent = 'Password strength'
        strengthText.style.color = 'var(--black)'
        
        if (password.length >= 8) strength++
        if (password.length >= 12) strength++
        if (/[A-Z]/.test(password)) strength++
        if (/[0-9]/.test(password)) strength++
        if (/[^A-Za-z0-9]/.test(password)) strength++
        if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength++
        
        if (password.length > 0) {
            if (strength <= 2) {
                // Weak
                segments[0].style.background = 'var(--error)'
                strengthText.textContent = 'Weak'
                strengthText.style.color = 'var(--error)'
            } else if (strength <= 4) {
                // Medium
                segments[0].style.background = 'orange'
                segments[1].style.background = 'orange'
                strengthText.textContent = 'Medium'
                strengthText.style.color = 'orange'
            } else {
                // Strong
                segments[0].style.background = 'var(--success)'
                segments[1].style.background = 'var(--success)'
                segments[2].style.background = 'var(--success)'
                strengthText.textContent = 'Strong'
                strengthText.style.color = 'var(--success)'
            }
        }
    })
}

// Dark mode toggle functionality
const darkModeToggle = document.getElementById('darkmode-toggle')
const body = document.body

// Check for saved user preference or use system preference
const savedTheme = localStorage.getItem('theme') || 
                 (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')

// Apply the saved theme
if (savedTheme === 'dark') {
    body.classList.add('dark-mode')
    darkModeToggle.checked = true
} else {
    body.classList.remove('dark-mode')
    darkModeToggle.checked = false
}

// Toggle dark mode when switch is clicked
darkModeToggle.addEventListener('change', function() {
    if (this.checked) {
        body.classList.add('dark-mode')
        localStorage.setItem('theme', 'dark')
    } else {
        body.classList.remove('dark-mode')
        localStorage.setItem('theme', 'light')
    }
})

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(email)
}