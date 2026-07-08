// Lógica para administración dinámica de RPUs
let rpuIndexCounter = 1;

function createRpuRowHTML(index, rpuValue = '', statusValue = 'ACTIVO') {
    return `
        <div class="rpu-row row g-3 mb-3 align-items-end" data-index="${index}">
            <div class="col-md-5">
                <label class="form-label d-md-none">Número RPU (12 dígitos) *</label>
                <input type="text" name="rpu[]" class="form-control rpu-input" value="${rpuValue}" placeholder="Ej. 012345678901 (12 dígitos)" required maxlength="12" minlength="12" inputmode="numeric" pattern="[0-9]*">
            </div>
            <div class="col-md-5">
                <label class="form-label d-md-none">Estatus del servicio del RPU *</label>
                <select name="estatus_rpu[]" class="form-select" required>
                    <option value="">-- SELECCIONE --</option>
                    <option value="ACTIVO" ${statusValue === 'ACTIVO' ? 'selected' : ''}>ACTIVO</option>
                    <option value="SUSPENDIDO" ${statusValue === 'SUSPENDIDO' ? 'selected' : ''}>SUSPENDIDO</option>
                    <option value="SIN CONTRATO" ${statusValue === 'SIN CONTRATO' ? 'selected' : ''}>SIN CONTRATO</option>
                    <option value="EN PROCESO" ${statusValue === 'EN PROCESO' ? 'selected' : ''}>EN PROCESO</option>
                </select>
            </div>
            <div class="col-md-2 text-end">
                <button type="button" class="btn-seg-eliminar-rpu w-100" onclick="removeRpuRow(this)">
                    Quitar
                </button>
            </div>
        </div>
    `;
}

function addRpuRow(rpuValue = '', statusValue = 'ACTIVO') {
    const container = document.getElementById('rpu-list-container');
    if (container) {
        const newRowHTML = createRpuRowHTML(rpuIndexCounter++, rpuValue, statusValue);
        container.insertAdjacentHTML('beforeend', newRowHTML);
    }
}

function removeRpuRow(button) {
    const row = button.closest('.rpu-row');
    if (row) {
        row.style.transition = 'all 0.3s ease';
        row.style.opacity = '0';
        row.style.transform = 'scale(0.9) translateY(-10px)';
        setTimeout(() => {
            row.remove();
        }, 300);
    }
}

// Delegación de eventos en el formulario para validaciones automáticas al escribir
const registroForm = document.getElementById('registroForm');
if (registroForm) {
    registroForm.addEventListener('input', function(e) {
        const target = e.target;
        
        // Entrada numérica para CP, Teléfono y RPUs (tanto el original como los dinámicos rpu[])
        if (target.name === 'cp' || target.name === 'telefono_director' || target.name === 'rpu[]' || target.classList.contains('rpu-input')) {
            target.value = target.value.replace(/[^0-9]/g, '');
            if (target.checkValidity()) target.classList.remove('is-invalid');
        }
        
        // Conversión a mayúsculas para CCT
        else if (target.name === 'cct') {
            target.value = target.value.toUpperCase().replace(/[^A-Z0-9]/g, '');
            if (target.checkValidity()) target.classList.remove('is-invalid');
        }
        
        // Conversión general a mayúsculas para textos (excepto campos de archivo)
        else if (target.tagName === 'INPUT' && target.type === 'text') {
            target.value = target.value.toUpperCase();
            if (target.checkValidity()) target.classList.remove('is-invalid');
        }
    });

    // Control de cambio para la foto de fachada
    registroForm.addEventListener('change', function(e) {
        if (e.target.name === 'foto_fachada') {
            const vistaPrevia = document.getElementById('vista-previa-img');
            const placeholder = document.getElementById('preview-placeholder');
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(evt) {
                    if (vistaPrevia) {
                        vistaPrevia.setAttribute('src', evt.target.result);
                        vistaPrevia.style.display = 'block';
                    }
                    if (placeholder) {
                        placeholder.style.display = 'none';
                    }
                }
                reader.readAsDataURL(file);
                e.target.classList.remove('is-invalid');
            } else {
                if (vistaPrevia) vistaPrevia.style.display = 'none';
                if (placeholder) placeholder.style.display = 'block';
            }
        }
    });
}

function nextStep(currentStep) {
    const stepEl = document.getElementById(`step-${currentStep}`);
    const inputs = stepEl.querySelectorAll('input, select');
    let isValid = true;

    inputs.forEach(input => {
        // Ignorar campos del contenedor de carga masiva si están ocultos
        if (input.closest('#bulk-paste-container')) {
            return;
        }
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

// Inicialización de botones de Carga Rápida y eventos del DOM
document.addEventListener('DOMContentLoaded', function() {
    const btnAddRpu = document.getElementById('btn-add-rpu');
    if (btnAddRpu) {
        btnAddRpu.addEventListener('click', function() {
            addRpuRow();
        });
    }

    // Toggle para Carga Rápida
    const btnToggleBulk = document.getElementById('btn-toggle-bulk');
    const bulkPasteContainer = document.getElementById('bulk-paste-container');
    if (btnToggleBulk && bulkPasteContainer) {
        btnToggleBulk.addEventListener('click', function() {
            bulkPasteContainer.classList.toggle('d-none');
            if (!bulkPasteContainer.classList.contains('d-none')) {
                document.getElementById('bulk-rpu-input').focus();
            }
        });
    }

    // Cancelar Carga Rápida
    const btnCancelBulk = document.getElementById('btn-cancel-bulk');
    if (btnCancelBulk && bulkPasteContainer) {
        btnCancelBulk.addEventListener('click', function() {
            bulkPasteContainer.classList.add('d-none');
            document.getElementById('bulk-rpu-input').value = '';
        });
    }

    // Aplicar Carga Rápida
    const btnApplyBulk = document.getElementById('btn-apply-bulk');
    if (btnApplyBulk) {
        btnApplyBulk.addEventListener('click', function() {
            const textarea = document.getElementById('bulk-rpu-input');
            const text = textarea.value;
            
            // Expresión regular para encontrar secuencias de exactamente 12 dígitos numéricos
            const regexRpu = /\b\d{12}\b/g;
            const matches = text.match(regexRpu) || [];
            
            if (matches.length === 0) {
                Swal.fire({
                    title: 'NO SE ENCONTRARON RPUs VÁLIDOS',
                    text: 'Asegúrese de que el texto contenga números de 12 dígitos.',
                    icon: 'warning',
                    confirmButtonColor: '#4A2328'
                });
                return;
            }

            // Obtener RPUs ya existentes en el formulario para evitar duplicados
            const existingRpus = Array.from(document.querySelectorAll('input[name="rpu[]"]'))
                                     .map(input => input.value);

            let addedCount = 0;
            let duplicateCount = 0;

            matches.forEach(rpuNum => {
                if (existingRpus.includes(rpuNum)) {
                    duplicateCount++;
                    return;
                }
                
                // Si la primera fila (Servicio Principal) está vacía, la llenamos primero
                const firstInput = document.querySelector('input[name="rpu[]"]');
                if (firstInput && firstInput.value === '') {
                    firstInput.value = rpuNum;
                    existingRpus.push(rpuNum);
                    addedCount++;
                } else {
                    addRpuRow(rpuNum, 'ACTIVO');
                    existingRpus.push(rpuNum);
                    addedCount++;
                }
            });

            textarea.value = '';
            bulkPasteContainer.classList.add('d-none');

            let message = `Se cargaron ${addedCount} servicio(s) correctamente.`;
            if (duplicateCount > 0) {
                message += ` (${duplicateCount} duplicado(s) omitido(s)).`;
            }

            Swal.fire({
                title: 'CARGA COMPLETADA',
                text: message,
                icon: 'success',
                confirmButtonColor: '#4A2328'
            });
        });
    }
});

// Enviar formulario
if (registroForm) {
    registroForm.addEventListener('submit', function(e) {
        e.preventDefault(); 
        
        const form = this;
        const inputs = document.getElementById('step-5').querySelectorAll('input, select');
        let formularioValido = true;

        inputs.forEach(input => {
            // Ignorar campos del contenedor de carga masiva
            if (input.closest('#bulk-paste-container')) {
                return;
            }
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
                text: 'Complete los datos de los servicios de luz (RPU) y suba la fotografía para terminar.',
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
        
        // Recopilar todos los RPUs y sus estatus para el resumen final
        const rpuElements = document.querySelectorAll('input[name="rpu[]"]');
        const estatusElements = document.querySelectorAll('select[name="estatus_rpu[]"]');
        
        let rpuHtml = '';
        rpuElements.forEach((el, index) => {
            const val = el.value;
            const est = estatusElements[index] ? estatusElements[index].value : '';
            rpuHtml += `<p style="margin-bottom: 6px; font-size: 1.05rem; line-height: 1.4;">
                <strong>Servicio ${index + 1}:</strong> <span style="color: #C5A059; font-weight: bold;">${val}</span> 
                <span class="badge ${est === 'ACTIVO' ? 'bg-success' : 'bg-warning text-dark'}" style="font-size: 0.8rem; margin-left: 5px; padding: 4px 8px;">${est}</span>
            </p>`;
        });

        const htmlResumen = `
            <div style="text-align: left; font-size: 1.1rem; background: #fcfbfa; padding: 18px; border-radius: 6px; border: 1px solid #cccccc; color: #333333; line-height: 1.6;">
                <p style="margin-bottom: 10px;"><strong>Clave CCT:</strong> <span style="color: #4A2328; font-weight: bold;">${cct}</span></p>
                <p style="margin-bottom: 10px;"><strong>Escuela:</strong> ${escuela}</p>
                <p style="margin-bottom: 10px;"><strong>Turno:</strong> ${turno}</p>
                <p style="margin-bottom: 10px;"><strong>Director:</strong> ${director}</p>
                <div style="margin-top: 12px; padding-top: 12px; border-top: 1px solid #dddddd;">
                    <p style="margin-bottom: 8px; font-weight: bold; color: #4A2328;">Servicios de Luz Registrados:</p>
                    ${rpuHtml}
                </div>
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
                        
                        // Eliminar las filas dinámicas de RPU creadas, dejando solo la primera
                        const container = document.getElementById('rpu-list-container');
                        if (container) {
                            const rows = container.querySelectorAll('.rpu-row');
                            rows.forEach((row, i) => {
                                if (i > 0) row.remove();
                            });
                        }
                        
                        // Restablecer vista previa de foto
                        const vistaPrevia = document.getElementById('vista-previa-img');
                        if (vistaPrevia) vistaPrevia.style.display = 'none';
                        const placeholder = document.getElementById('preview-placeholder');
                        if (placeholder) placeholder.style.display = 'block';

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
}