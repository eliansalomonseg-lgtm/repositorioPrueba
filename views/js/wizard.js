document.querySelectorAll('input[type="text"]').forEach(input => {
    if(input.name !== 'rpu') {
        input.addEventListener('input', function() {
            this.value = this.value.toUpperCase();
            if (this.checkValidity()) this.classList.remove('is-invalid');
        });
    }
});

const inputCctEvt = document.querySelector('input[name="cct"]');
if(inputCctEvt) {
    inputCctEvt.addEventListener('input', function() {
        this.value = this.value.toUpperCase().replace(/[^A-Z0-9]/g, '');
        if (this.checkValidity()) this.classList.remove('is-invalid');
    });
}

const camposNumericos = ['rpu', 'cp', 'telefono_director'];
camposNumericos.forEach(nombreCampo => {
    const inputElement = document.querySelector(`input[name="${nombreCampo}"]`);
    if(inputElement) {
        inputElement.addEventListener('input', function() {
            this.value = this.value.replace(/[^0-9]/g, '');
            if (this.checkValidity()) this.classList.remove('is-invalid');
        });
    }
});

const inputFoto = document.querySelector('input[name="foto_fachada"]');
if(inputFoto) {
    inputFoto.addEventListener('change', function() {
        const vistaPrevia = document.getElementById('vista-previa-img');
        const file = this.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                vistaPrevia.setAttribute('src', e.target.result);
                vistaPrevia.style.display = 'block';
            }
            reader.readAsDataURL(file);
            this.classList.remove('is-invalid');
        }
    });
}

function nextStep(currentStep) {
    const stepEl = document.getElementById(`step-${currentStep}`);
    const inputs = stepEl.querySelectorAll('input, select');
    let isValid = true;

    inputs.forEach(input => {
        if (!input.checkValidity()) {
            input.classList.add('is-invalid');
            isValid = false;
        } else {
            input.classList.remove('is-invalid');
        }
    });

    if (currentStep === 1) {
        const inputCct = document.querySelector('input[name="cct"]');
        const regexCct = /^[0-9]{2}[A-Z]{3}[0-9]{4}[A-Z]{1}$/;
        if (inputCct.value && !regexCct.test(inputCct.value.toUpperCase())) {
            inputCct.classList.add('is-invalid');
            isValid = false;
        }
    }

    if (isValid) {
        document.getElementById(`step-${currentStep}`).classList.remove('active');
        document.getElementById(`step-${currentStep + 1}`).classList.add('active');
        document.getElementById(`indicator-${currentStep + 1}`).classList.add('active');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
        Swal.fire({
            title: 'HAY CASILLAS VACÍAS O INCORRECTAS',
            text: 'Por favor, llene los campos marcados en rojo antes de pasar a la siguiente sección.',
            icon: 'warning',
            confirmButtonColor: '#4A2328',
            confirmButtonText: 'Revisar'
        });
    }
}

function prevStep(currentStep) {
    document.getElementById(`step-${currentStep}`).classList.remove('active');
    document.getElementById(`step-${currentStep - 1}`).classList.add('active');
    document.getElementById(`indicator-${currentStep}`).classList.remove('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

document.getElementById('registroForm').addEventListener('submit', function(e) {
    e.preventDefault(); 
    
    const form = this;
    const inputs = document.getElementById('step-5').querySelectorAll('input, select');
    let formularioValido = true;

    inputs.forEach(input => {
        if (!input.checkValidity()) {
            input.classList.add('is-invalid');
            formularioValido = false;
        } else {
            input.classList.remove('is-invalid');
        }
    });

    if (!formularioValido) {
        Swal.fire({
            title: 'FALTA INFORMACIÓN',
            text: 'Complete los datos de la luz y suba la fotografía para terminar.',
            icon: 'warning',
            confirmButtonColor: '#4A2328',
            confirmButtonText: 'Revisar'
        });
        return;
    }

    const cct = document.querySelector('input[name="cct"]').value;
    const escuela = document.querySelector('input[name="nombre_escuela"]').value;
    const turno = document.querySelector('select[name="turno"]').value;
    const director = document.querySelector('input[name="nombre_director"]').value;
    const rpu = document.querySelector('input[name="rpu"]').value;

    const htmlResumen = `
        <div style="text-align: left; font-size: 1.1rem; background: #fcfbfa; padding: 18px; border-radius: 6px; border: 1px solid #cccccc; color: #333333; line-height: 1.6;">
            <p style="margin-bottom: 10px;"><strong>Clave CCT:</strong> <span style="color: #4A2328; font-weight: bold;">${cct}</span></p>
            <p style="margin-bottom: 10px;"><strong>Escuela:</strong> ${escuela}</p>
            <p style="margin-bottom: 10px;"><strong>Turno:</strong> ${turno}</p>
            <p style="margin-bottom: 10px;"><strong>Director:</strong> ${director}</p>
            <p style="margin-bottom: 0;"><strong>Recibo RPU:</strong> <span style="color: #C5A059; font-weight: bold;">${rpu}</span></p>
        </div>
        <p style="margin-top: 18px; font-size: 1.05rem; color: #444444; font-weight: bold;">¿Está seguro de que todos los datos son correctos?</p>
    `;

    Swal.fire({
        title: 'CONFIRMACIÓN FINAL',
        html: htmlResumen,
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#4A2328', 
        cancelButtonColor: '#6c757d',
        confirmButtonText: 'Sí, enviar información',
        cancelButtonText: 'No, revisar de nuevo',
        customClass: { popup: 'border-institucional-swal' }
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: 'Guardando datos...',
                text: 'Procesando información.',
                allowOutsideClick: false,
                didOpen: () => { Swal.showLoading(); }
            });

            setTimeout(() => {
                Swal.fire({
                    title: '¡REGISTRO EXITOSO!',
                    html: `<p style="font-size: 1.1rem;">La información se ha guardado correctamente.</p>`,
                    icon: 'success',
                    confirmButtonColor: '#28a745',
                    confirmButtonText: 'Finalizar'
                }).then(() => {
                    form.reset(); 
                    document.getElementById('vista-previa-img').style.display = 'none';
                    document.querySelectorAll('.form-step').forEach(el => el.classList.remove('active'));
                    document.querySelectorAll('.step-indicator').forEach(el => el.classList.remove('active'));
                    document.getElementById('step-1').classList.add('active');
                    document.getElementById('indicator-1').classList.add('active');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                });
            }, 2000);
        }
    });
});