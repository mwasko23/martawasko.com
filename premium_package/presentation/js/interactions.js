/**
 * Starter Kit Interactive Presentation
 * ROI Calculator & Safety Checklist Interactivity
 * hitit.ai - AI Education for the Thoughtful Mind
 */

document.addEventListener('DOMContentLoaded', function() {
    initROICalculator();
    initSafetyChecklist();
    initAnimations();
    initModalSystem();
});

// ============================================
// ROI CALCULATOR
// ============================================

function initROICalculator() {
    const frequencySelect = document.getElementById('frequency');
    const minutesInput = document.getElementById('minutes');
    const painButtons = document.querySelectorAll('.pain-btn');
    const hoursResult = document.getElementById('hours-saved');
    const verdictResult = document.getElementById('verdict');

    // Guard clause if elements don't exist
    if (!frequencySelect || !minutesInput) return;

    let currentPain = 2; // Default pain level

    // Pain button selection
    painButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all
            painButtons.forEach(b => b.classList.remove('active'));
            // Add active class to clicked
            this.classList.add('active');
            currentPain = parseInt(this.dataset.value);
            calculateROI();
        });
    });

    // Set default pain button
    const defaultPainBtn = document.querySelector('.pain-btn[data-value="2"]');
    if (defaultPainBtn) defaultPainBtn.classList.add('active');

    // Input change handlers
    frequencySelect.addEventListener('change', calculateROI);
    minutesInput.addEventListener('input', calculateROI);

    function calculateROI() {
        const frequency = parseInt(frequencySelect.value) || 52;
        const minutes = parseInt(minutesInput.value) || 30;
        const pain = currentPain;

        // Calculate hours saved per year
        // Formula: (frequency * minutes * pain_multiplier) / 60
        const painMultiplier = pain === 1 ? 0.5 : pain === 2 ? 1 : 1.5;
        const hoursSaved = Math.round((frequency * minutes * painMultiplier) / 60);

        // Update display with animation
        animateNumber(hoursResult, hoursSaved);

        // Determine verdict
        let verdict = '';
        let verdictClass = '';

        if (hoursSaved >= 100) {
            verdict = 'Absolutely worth automating!';
            verdictClass = 'verdict-high';
        } else if (hoursSaved >= 40) {
            verdict = 'Strong candidate for automation';
            verdictClass = 'verdict-medium';
        } else if (hoursSaved >= 15) {
            verdict = 'Consider if complexity is low';
            verdictClass = 'verdict-low';
        } else {
            verdict = 'May not be worth the effort';
            verdictClass = 'verdict-skip';
        }

        if (verdictResult) {
            verdictResult.textContent = verdict;
            verdictResult.className = 'verdict-text ' + verdictClass;
        }
    }

    // Initial calculation
    calculateROI();
}

function animateNumber(element, target) {
    if (!element) return;

    const current = parseInt(element.textContent) || 0;
    const duration = 500;
    const steps = 20;
    const increment = (target - current) / steps;
    let step = 0;

    const timer = setInterval(() => {
        step++;
        const value = Math.round(current + (increment * step));
        element.textContent = value;

        if (step >= steps) {
            clearInterval(timer);
            element.textContent = target;
        }
    }, duration / steps);
}

// ============================================
// SAFETY CHECKLIST
// ============================================

function initSafetyChecklist() {
    const checkboxes = document.querySelectorAll('.safety-check input[type="checkbox"]');
    const verdictEl = document.getElementById('safety-verdict');

    if (!checkboxes.length || !verdictEl) return;

    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', updateSafetyVerdict);

        // Add visual feedback on check
        checkbox.addEventListener('change', function() {
            const parent = this.closest('.safety-check');
            if (this.checked) {
                parent.classList.add('checked');
                createCheckAnimation(parent);
            } else {
                parent.classList.remove('checked');
            }
        });
    });

    function updateSafetyVerdict() {
        const total = checkboxes.length;
        const checked = document.querySelectorAll('.safety-check input[type="checkbox"]:checked').length;

        let verdict = '';
        let verdictClass = '';

        if (checked === total) {
            verdict = 'All clear! Safe to proceed.';
            verdictClass = 'safety-pass';
        } else if (checked >= total - 1) {
            verdict = 'Almost there - review remaining item';
            verdictClass = 'safety-warning';
        } else if (checked > 0) {
            verdict = `${total - checked} safety checks remaining`;
            verdictClass = 'safety-pending';
        } else {
            verdict = 'Complete all safety checks before proceeding';
            verdictClass = 'safety-pending';
        }

        verdictEl.textContent = verdict;
        verdictEl.className = 'safety-verdict ' + verdictClass;

        // Celebrate when all checked
        if (checked === total) {
            celebrateCompletion(verdictEl);
        }
    }

    // Initial state
    updateSafetyVerdict();
}

function createCheckAnimation(element) {
    // Add a brief glow effect
    element.style.boxShadow = '0 0 20px var(--accent-green)';
    setTimeout(() => {
        element.style.boxShadow = '';
    }, 300);
}

function celebrateCompletion(element) {
    // Simple celebration animation
    element.style.transform = 'scale(1.05)';
    element.style.transition = 'transform 0.2s ease';

    setTimeout(() => {
        element.style.transform = 'scale(1)';
    }, 200);
}

// ============================================
// SCROLL ANIMATIONS & EFFECTS
// ============================================

function initAnimations() {
    // Add entrance animations to elements as they come into view
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe key elements
    document.querySelectorAll('.glass-card, .cta-button, .feature-card').forEach(el => {
        observer.observe(el);
    });

    // Initialize reveal.js custom behaviors
    initRevealCustomizations();
}

function initRevealCustomizations() {
    // Wait for Reveal to be ready
    if (typeof Reveal === 'undefined') return;

    Reveal.on('slidechanged', event => {
        // Reset animations when entering a new slide
        const slide = event.currentSlide;

        // Reset calculator if on that slide
        if (slide.querySelector('.calculator')) {
            // Calculator is already initialized
        }

        // Reset safety checklist if leaving that slide
        if (event.previousSlide && event.previousSlide.querySelector('.safety-checklist')) {
            // Optionally reset checkboxes
        }

        // Add slide-specific entrance animations
        const animatedElements = slide.querySelectorAll('[data-animate]');
        animatedElements.forEach((el, index) => {
            el.style.animationDelay = `${index * 0.1}s`;
            el.classList.add('animate-in');
        });
    });

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        // Press 'R' to reset calculator
        if (e.key === 'r' || e.key === 'R') {
            const frequencySelect = document.getElementById('frequency');
            const minutesInput = document.getElementById('minutes');
            if (frequencySelect) frequencySelect.value = '52';
            if (minutesInput) minutesInput.value = '30';

            const painButtons = document.querySelectorAll('.pain-btn');
            painButtons.forEach(b => b.classList.remove('active'));
            const defaultBtn = document.querySelector('.pain-btn[data-value="2"]');
            if (defaultBtn) defaultBtn.classList.add('active');

            initROICalculator();
        }

        // Press 'C' to clear safety checklist
        if (e.key === 'c' || e.key === 'C') {
            const checkboxes = document.querySelectorAll('.safety-check input[type="checkbox"]');
            checkboxes.forEach(cb => {
                cb.checked = false;
                cb.closest('.safety-check').classList.remove('checked');
            });
            initSafetyChecklist();
        }
    });
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Add loading complete class to body
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// ============================================
// MODAL/POPUP SYSTEM
// ============================================

function initModalSystem() {
    // Create modal HTML structure
    const modalHTML = `
        <div class="modal-overlay" id="modal-overlay">
            <div class="modal-content">
                <button class="modal-close" id="modal-close">×</button>
                <div class="modal-header">
                    <span class="modal-icon" id="modal-icon"></span>
                    <h3 class="modal-title" id="modal-title"></h3>
                </div>
                <div class="modal-body" id="modal-body"></div>
            </div>
        </div>
    `;

    // Add modal to body
    document.body.insertAdjacentHTML('beforeend', modalHTML);

    // Get modal elements
    const overlay = document.getElementById('modal-overlay');
    const modalTitle = document.getElementById('modal-title');
    const modalIcon = document.getElementById('modal-icon');
    const modalBody = document.getElementById('modal-body');
    const closeBtn = document.getElementById('modal-close');

    // Popup content database
    const popupContent = {
        // Slide 2: Firewall constraints
        'locked-laptop': {
            icon: '⛔',
            iconClass: 'red',
            title: 'Locked-Down Laptop',
            content: `
                <p><strong>What this means:</strong> Your organization uses Mobile Device Management (MDM) or endpoint management software to control your work computer.</p>

                <h4>Common Restrictions:</h4>
                <ul>
                    <li><strong>No admin rights</strong> — You can't install software without IT approval</li>
                    <li><strong>USB restrictions</strong> — External drives may be blocked or read-only</li>
                    <li><strong>Browser policies</strong> — Extensions limited, certain sites blocked</li>
                    <li><strong>Encryption enforced</strong> — BitLocker or FileVault required</li>
                    <li><strong>Remote wipe capability</strong> — IT can erase the device if lost</li>
                </ul>

                <h4>Why Organizations Do This:</h4>
                <p>MDM protects against data breaches, malware infections, and regulatory violations. Industries like healthcare (HIPAA), finance (SOX, PCI-DSS), and government (FedRAMP) often mandate these controls.</p>

                <p class="modal-tip"><span class="accent-cyan">◆</span> <strong>Tip:</strong> Many automation tools work within these constraints — the Starter Kit shows you which ones.</p>
            `
        },
        'vpn-required': {
            icon: '◉',
            iconClass: 'cyan',
            title: 'VPN Required',
            content: `
                <p><strong>What this means:</strong> A Virtual Private Network (VPN) encrypts your internet traffic and routes it through your company's secure network.</p>

                <h4>Why It's Required:</h4>
                <ul>
                    <li><strong>Data protection</strong> — All traffic is encrypted end-to-end</li>
                    <li><strong>Access control</strong> — Internal systems only accessible via VPN</li>
                    <li><strong>Audit trails</strong> — IT can log all network activity for compliance</li>
                    <li><strong>Geographic compliance</strong> — Ensures data stays in approved regions</li>
                </ul>

                <h4>Impact on AI Tools:</h4>
                <p>VPN may block or slow down access to cloud-based AI services. Some organizations route all traffic through corporate proxies that can inspect encrypted connections.</p>

                <h4>Split Tunneling:</h4>
                <p>Some VPNs use "split tunneling" — work traffic goes through VPN, personal traffic doesn't. Check your policy.</p>

                <p class="modal-tip"><span class="accent-cyan">◆</span> <strong>Tip:</strong> Tier 3 (local) AI tools work entirely offline and aren't affected by VPN restrictions.</p>
            `
        },
        'compliance-watching': {
            icon: '⬡',
            iconClass: 'purple',
            title: 'Compliance Monitoring',
            content: `
                <p><strong>What this means:</strong> Your organization actively monitors activities to ensure regulatory compliance and security policies are followed.</p>

                <h4>Types of Monitoring:</h4>
                <ul>
                    <li><strong>Data Loss Prevention (DLP)</strong> — Scans emails and uploads for sensitive data</li>
                    <li><strong>User Activity Monitoring</strong> — Tracks application usage, screenshots, keystrokes</li>
                    <li><strong>Email filtering</strong> — Scans attachments and blocks suspicious content</li>
                    <li><strong>Cloud Access Security Broker (CASB)</strong> — Monitors cloud service usage</li>
                </ul>

                <h4>Common Regulations:</h4>
                <ul>
                    <li><strong>HIPAA</strong> — Healthcare data protection (U.S.)</li>
                    <li><strong>SOX</strong> — Financial reporting controls</li>
                    <li><strong>GDPR</strong> — Personal data protection (EU)</li>
                    <li><strong>PCI-DSS</strong> — Payment card security</li>
                    <li><strong>FedRAMP</strong> — Government cloud security</li>
                </ul>

                <p class="modal-tip"><span class="accent-cyan">◆</span> <strong>Tip:</strong> The Safety Checklist (Q2) helps you stay compliant while still automating effectively.</p>
            `
        },
        'no-install': {
            icon: '⊘',
            iconClass: 'orange',
            title: 'Software Installation Restrictions',
            content: `
                <p><strong>What this means:</strong> You cannot freely install applications without IT approval or administrator credentials.</p>

                <h4>Common Policies:</h4>
                <ul>
                    <li><strong>Allowlist only</strong> — Only pre-approved software can run</li>
                    <li><strong>Software request portal</strong> — Must submit tickets for new apps</li>
                    <li><strong>No personal apps</strong> — Only business-justified software allowed</li>
                    <li><strong>Signed apps only</strong> — Unsigned executables blocked</li>
                </ul>

                <h4>Why This Matters for Automation:</h4>
                <p>Many automation guides assume you can just "pip install" or download any tool. Behind a firewall, you need approved alternatives.</p>

                <h4>What Usually IS Allowed:</h4>
                <ul>
                    <li>Microsoft Office (already installed)</li>
                    <li>Browser-based tools (if site isn't blocked)</li>
                    <li>Portable/no-install applications</li>
                    <li>Python (often pre-installed for data teams)</li>
                </ul>

                <p class="modal-tip"><span class="accent-cyan">◆</span> <strong>Tip:</strong> Episode 5 covers your three-tier toolkit — find what works within YOUR constraints.</p>
            `
        },

        // Slide 5: Safety checklist terms
        'phi-pii': {
            icon: '⛔',
            iconClass: 'red',
            title: 'PHI & PII Explained',
            content: `
                <p><strong>PHI (Protected Health Information)</strong> — Any health data that can identify an individual. Covered by HIPAA.</p>

                <h4>The 18 HIPAA Identifiers:</h4>
                <div class="modal-columns">
                    <ul>
                        <li>Names</li>
                        <li>Geographic data (below state)</li>
                        <li>Dates (except year)</li>
                        <li>Phone numbers</li>
                        <li>Fax numbers</li>
                        <li>Email addresses</li>
                        <li>Social Security numbers</li>
                        <li>Medical record numbers</li>
                        <li>Health plan numbers</li>
                    </ul>
                    <ul>
                        <li>Account numbers</li>
                        <li>Certificate/license numbers</li>
                        <li>Vehicle identifiers</li>
                        <li>Device identifiers</li>
                        <li>Web URLs</li>
                        <li>IP addresses</li>
                        <li>Biometric identifiers</li>
                        <li>Full-face photos</li>
                        <li>Any unique identifier</li>
                    </ul>
                </div>

                <p><strong>PII (Personally Identifiable Information)</strong> — Any data that can identify a specific person, even outside healthcare.</p>

                <p class="modal-warning"><span class="accent-red">⚠</span> <strong>Rule:</strong> If in doubt, treat it as sensitive. Use synthetic data for testing.</p>
            `
        },
        'auto-send': {
            icon: '◈',
            iconClass: 'orange',
            title: 'No Auto-Send Rule',
            content: `
                <p><strong>The Rule:</strong> Never configure automation to send emails, messages, or communications without human review.</p>

                <h4>Why This Matters:</h4>
                <p>In 2023, a major healthcare system accidentally sent 280,000 wrong emails due to an automation error. Careers ended.</p>

                <h4>Safe Alternatives:</h4>
                <ul>
                    <li><strong>Draft mode</strong> — Automation creates drafts, you review and click send</li>
                    <li><strong>Staging folder</strong> — Messages queue for manual approval</li>
                    <li><strong>Daily digest</strong> — Summarizes what WOULD be sent</li>
                    <li><strong>Test recipients</strong> — Send to yourself first during development</li>
                </ul>

                <p class="modal-tip"><span class="accent-cyan">◆</span> <strong>Tip:</strong> The most elegant automation still keeps humans in the loop for external communications.</p>
            `
        },
        'human-loop': {
            icon: '◉',
            iconClass: 'cyan',
            title: 'Human in the Loop',
            content: `
                <p><strong>The Principle:</strong> For any decision with real-world consequences, a human must verify before execution.</p>

                <h4>High-Stakes Decisions (Always Human):</h4>
                <ul>
                    <li>Financial transactions or approvals</li>
                    <li>HR actions (hiring, firing, discipline)</li>
                    <li>Clinical or medical decisions</li>
                    <li>Legal commitments or contracts</li>
                    <li>External communications</li>
                </ul>

                <h4>Safe for Full Automation:</h4>
                <ul>
                    <li>Internal file organization</li>
                    <li>Data formatting and cleanup</li>
                    <li>Report generation (not distribution)</li>
                    <li>Notifications to yourself</li>
                </ul>

                <p class="modal-tip"><span class="accent-cyan">◆</span> <strong>Remember:</strong> AI is your junior assistant, not your replacement. You provide the judgment.</p>
            `
        },
        'manual-fallback': {
            icon: '⤺',
            iconClass: 'green',
            title: 'Manual Fallback',
            content: `
                <p><strong>The Rule:</strong> Never automate something if you can't complete it manually when the automation breaks.</p>

                <h4>Why Automations Break:</h4>
                <ul>
                    <li>Source file format changes</li>
                    <li>System updates break dependencies</li>
                    <li>API keys expire</li>
                    <li>Network/VPN issues</li>
                    <li>Edge cases you didn't anticipate</li>
                </ul>

                <h4>Your Fallback Plan Should Include:</h4>
                <ul>
                    <li><strong>Documentation</strong> — Mini-Spec describes manual process</li>
                    <li><strong>Time estimate</strong> — How long to do it manually?</li>
                    <li><strong>Who else knows</strong> — Can someone cover if you're out?</li>
                    <li><strong>Last known good</strong> — Where's your most recent manual backup?</li>
                </ul>

                <p class="modal-tip"><span class="accent-cyan">◆</span> <strong>Best Practice:</strong> Keep your manual process documented even after automation is stable.</p>
            `
        },

        // Slide 6: Mini-Spec sections
        'spec-purpose': {
            icon: '1',
            iconClass: 'purple',
            title: 'Purpose & Context',
            content: `
                <p><strong>What goes here:</strong> A 2-3 sentence summary of WHY this workflow exists and WHO uses it.</p>

                <h4>Answer These Questions:</h4>
                <ul>
                    <li>What business problem does this solve?</li>
                    <li>Who is the primary user/beneficiary?</li>
                    <li>What happens if this workflow doesn't run?</li>
                </ul>

                <h4>Example:</h4>
                <div class="modal-example">
                    "This workflow consolidates weekly sales data from 5 regional spreadsheets into a single executive summary. Used by the VP of Sales every Monday. Without it, the leadership meeting lacks current numbers."
                </div>

                <p class="modal-tip"><span class="accent-cyan">◆</span> <strong>Tip:</strong> If you can't explain the purpose clearly, you might not understand the workflow well enough to automate it.</p>
            `
        },
        'spec-trigger': {
            icon: '2',
            iconClass: 'purple',
            title: 'Trigger',
            content: `
                <p><strong>What goes here:</strong> The specific event or condition that starts this workflow.</p>

                <h4>Types of Triggers:</h4>
                <ul>
                    <li><strong>Time-based:</strong> "Every Monday at 8am" or "First of month"</li>
                    <li><strong>Event-based:</strong> "When email arrives from X" or "When file appears in folder"</li>
                    <li><strong>Manual:</strong> "When I click the Run button"</li>
                    <li><strong>Threshold:</strong> "When value exceeds X"</li>
                </ul>

                <h4>Example:</h4>
                <div class="modal-example">
                    "Triggered manually every Friday afternoon after regional teams upload their weekly files to the shared drive."
                </div>

                <p class="modal-tip"><span class="accent-cyan">◆</span> <strong>Tip:</strong> Be specific. "Weekly" isn't a trigger — "Every Friday at 3pm EST" is.</p>
            `
        },
        'spec-inputs': {
            icon: '3',
            iconClass: 'purple',
            title: 'Inputs',
            content: `
                <p><strong>What goes here:</strong> Every file, data source, or piece of information the workflow needs.</p>

                <h4>Document For Each Input:</h4>
                <ul>
                    <li><strong>Name/location:</strong> Exact path or how to find it</li>
                    <li><strong>Format:</strong> .xlsx, .csv, email, database query</li>
                    <li><strong>Structure:</strong> Column names, expected values</li>
                    <li><strong>Source:</strong> Who provides it and when</li>
                </ul>

                <h4>Example:</h4>
                <div class="modal-example">
                    "5 Excel files from: //server/sales/weekly/<br>
                    Format: region_YYYY-MM-DD.xlsx<br>
                    Columns: Date, Product, Quantity, Revenue<br>
                    Uploaded by regional managers by Friday 2pm"
                </div>
            `
        },
        'spec-outputs': {
            icon: '4',
            iconClass: 'purple',
            title: 'Outputs',
            content: `
                <p><strong>What goes here:</strong> Every deliverable, file, or result the workflow produces.</p>

                <h4>Document For Each Output:</h4>
                <ul>
                    <li><strong>Name/location:</strong> Where it goes</li>
                    <li><strong>Format:</strong> File type, structure</li>
                    <li><strong>Recipients:</strong> Who uses it</li>
                    <li><strong>Timing:</strong> When they need it</li>
                </ul>

                <h4>Example:</h4>
                <div class="modal-example">
                    "Executive_Summary_YYYY-MM-DD.xlsx<br>
                    Location: //server/reports/weekly/<br>
                    Format: Summary tab + 5 regional tabs<br>
                    Used by: VP Sales for Monday 9am meeting"
                </div>
            `
        },
        'spec-process': {
            icon: '5',
            iconClass: 'purple',
            title: 'Process Steps',
            content: `
                <p><strong>What goes here:</strong> Every step, in order, using verb-first language.</p>

                <h4>Rules for Good Steps:</h4>
                <ul>
                    <li><strong>Start with a verb:</strong> Open, Copy, Filter, Calculate, Save</li>
                    <li><strong>One action per step:</strong> Not "open and filter"</li>
                    <li><strong>Include specifics:</strong> Column names, formulas, criteria</li>
                    <li><strong>Number them:</strong> Order matters</li>
                </ul>

                <h4>Example:</h4>
                <div class="modal-example">
                    "1. Open each regional file from input folder<br>
                    2. Filter for current week's dates<br>
                    3. Sum Revenue column per product<br>
                    4. Copy results to Summary tab<br>
                    5. Sort by Revenue descending<br>
                    6. Save with today's date in filename"
                </div>
            `
        },
        'spec-assumptions': {
            icon: '6',
            iconClass: 'purple',
            title: 'Assumptions',
            content: `
                <p><strong>What goes here:</strong> Conditions that MUST be true for this workflow to succeed.</p>

                <h4>Common Assumptions to Document:</h4>
                <ul>
                    <li>File locations won't change</li>
                    <li>Column names stay consistent</li>
                    <li>Data types are correct (numbers are numbers)</li>
                    <li>Files are uploaded on time</li>
                    <li>User has required permissions</li>
                </ul>

                <h4>Example:</h4>
                <div class="modal-example">
                    "- All 5 regional files uploaded by 2pm Friday<br>
                    - Column headers unchanged from template<br>
                    - Revenue values are numeric (no '$' symbols)<br>
                    - User has write access to output folder"
                </div>

                <p class="modal-tip"><span class="accent-cyan">◆</span> <strong>Tip:</strong> Assumptions become your error checking list later.</p>
            `
        },
        'spec-edge': {
            icon: '7',
            iconClass: 'purple',
            title: 'Edge Cases',
            content: `
                <p><strong>What goes here:</strong> Unusual situations that might cause the workflow to fail or produce wrong results.</p>

                <h4>Common Edge Cases:</h4>
                <ul>
                    <li><strong>Missing data:</strong> What if a file is missing?</li>
                    <li><strong>Empty values:</strong> Blanks in required fields?</li>
                    <li><strong>Duplicates:</strong> Same record twice?</li>
                    <li><strong>Wrong format:</strong> Text instead of numbers?</li>
                    <li><strong>Timing:</strong> What if someone's late?</li>
                </ul>

                <h4>For Each Edge Case, Document:</h4>
                <ul>
                    <li>What the situation is</li>
                    <li>How you'd handle it manually</li>
                    <li>How automation should handle it</li>
                </ul>
            `
        },
        'spec-testing': {
            icon: '8',
            iconClass: 'purple',
            title: 'Testing Checklist',
            content: `
                <p><strong>What goes here:</strong> Specific checks to verify the automation works correctly.</p>

                <h4>Types of Tests:</h4>
                <ul>
                    <li><strong>Happy path:</strong> Does it work with perfect inputs?</li>
                    <li><strong>Edge cases:</strong> Does it handle the unusual situations?</li>
                    <li><strong>Comparison:</strong> Does output match manual process?</li>
                    <li><strong>Performance:</strong> Does it run in acceptable time?</li>
                </ul>

                <h4>Example Checklist:</h4>
                <div class="modal-example">
                    "☐ Output row count matches sum of inputs<br>
                    ☐ Revenue totals match manual calculation<br>
                    ☐ All 5 regions represented<br>
                    ☐ Date range is correct week<br>
                    ☐ File saves without errors<br>
                    ☐ Runs in under 2 minutes"
                </div>
            `
        },

        // Slide 7: MVP concepts
        'mvp-concept': {
            icon: '◆',
            iconClass: 'green',
            title: 'Minimum Viable Product (MVP)',
            content: `
                <p><strong>Definition:</strong> The smallest version of your automation that delivers real value.</p>

                <h4>The MVP Mindset:</h4>
                <ul>
                    <li><strong>Not:</strong> "Let me automate everything at once"</li>
                    <li><strong>Yes:</strong> "What's the ONE step that saves the most time?"</li>
                </ul>

                <h4>Benefits of Starting Small:</h4>
                <ul>
                    <li><strong>Faster wins</strong> — Get value in days, not months</li>
                    <li><strong>Lower risk</strong> — Mistakes affect less</li>
                    <li><strong>Build confidence</strong> — Success breeds success</li>
                    <li><strong>Learn incrementally</strong> — Each piece teaches you</li>
                </ul>

                <h4>How to Find Your MVP:</h4>
                <ol>
                    <li>List all the steps in your full workflow</li>
                    <li>Identify the most time-consuming step</li>
                    <li>Ask: "Can I automate JUST this?"</li>
                    <li>That's probably your MVP</li>
                </ol>
            `
        },

        // Slide 8: Maintenance concepts
        'maint-time': {
            icon: '◔',
            iconClass: 'cyan',
            title: 'Maintenance Time',
            content: `
                <p><strong>The Question:</strong> Do you have 30 minutes per month to maintain this automation?</p>

                <h4>What Maintenance Includes:</h4>
                <ul>
                    <li>Checking that outputs look correct</li>
                    <li>Handling occasional errors or edge cases</li>
                    <li>Updating when source formats change</li>
                    <li>Explaining it to colleagues</li>
                </ul>

                <h4>If You Don't Have Time:</h4>
                <p>An unmaintained automation will eventually break and cause problems worse than the manual process it replaced.</p>

                <p class="modal-tip"><span class="accent-cyan">◆</span> <strong>Reality Check:</strong> If you can't commit to maintenance, consider whether automation is right for this workflow.</p>
            `
        },
        'maint-stable': {
            icon: '⟳',
            iconClass: 'green',
            title: 'Process Stability',
            content: `
                <p><strong>The Question:</strong> Has this process been stable, or does it change frequently?</p>

                <h4>Signs of an Unstable Process:</h4>
                <ul>
                    <li>Source file formats change often</li>
                    <li>Requirements shift monthly</li>
                    <li>Multiple people modify the process</li>
                    <li>"We're about to reorganize this"</li>
                </ul>

                <h4>If the Process is Unstable:</h4>
                <p>Wait. Automating a moving target wastes effort and creates frustration. Document it first, automate when it settles.</p>

                <h4>Good Candidates:</h4>
                <ul>
                    <li>Same format for 6+ months</li>
                    <li>Clear owner who controls changes</li>
                    <li>No planned system migrations</li>
                </ul>
            `
        },
        'maint-docs': {
            icon: '≡',
            iconClass: 'purple',
            title: 'Documentation Ready',
            content: `
                <p><strong>The Question:</strong> Is your Mini-Spec complete and up to date?</p>

                <h4>Why Documentation Matters:</h4>
                <ul>
                    <li><strong>Future you:</strong> You WILL forget how it works</li>
                    <li><strong>Colleagues:</strong> Can they run it if you're out?</li>
                    <li><strong>Debugging:</strong> Hard to fix what you don't understand</li>
                    <li><strong>Improvements:</strong> Can't enhance what isn't documented</li>
                </ul>

                <h4>Minimum Documentation:</h4>
                <ul>
                    <li>Completed Mini-Spec (all 8 sections)</li>
                    <li>Location of all files (inputs, outputs, scripts)</li>
                    <li>How to run it manually if automation fails</li>
                </ul>
            `
        },
        'maint-fallback': {
            icon: '⤺',
            iconClass: 'orange',
            title: 'Fallback Plan',
            content: `
                <p><strong>The Question:</strong> If this automation breaks at the worst possible moment, can you complete the task manually?</p>

                <h4>Your Fallback Plan Needs:</h4>
                <ul>
                    <li><strong>Time estimate:</strong> How long manually?</li>
                    <li><strong>Instructions:</strong> Step-by-step manual process</li>
                    <li><strong>Access:</strong> Do you have all required permissions?</li>
                    <li><strong>Backup person:</strong> Who else can do this?</li>
                </ul>

                <h4>Test Your Fallback:</h4>
                <p>Actually do the manual process once every few months. This verifies your documentation and keeps skills fresh.</p>

                <p class="modal-tip"><span class="accent-cyan">◆</span> <strong>Golden Rule:</strong> Never automate yourself into a corner you can't manually escape from.</p>
            `
        }
    };

    // Open modal function
    function openModal(contentKey) {
        const content = popupContent[contentKey];
        if (!content) return;

        modalIcon.textContent = content.icon;
        modalIcon.className = 'modal-icon glow-icon ' + content.iconClass;
        modalTitle.textContent = content.title;
        modalBody.innerHTML = content.content;

        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    // Close modal function
    function closeModal() {
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Close on button click
    closeBtn.addEventListener('click', closeModal);

    // Close on overlay click (outside modal)
    overlay.addEventListener('click', function(e) {
        if (e.target === overlay) {
            closeModal();
        }
    });

    // Close on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && overlay.classList.contains('active')) {
            closeModal();
        }
    });

    // Add click handlers to clickable items
    document.querySelectorAll('[data-popup]').forEach(item => {
        item.classList.add('clickable');
        item.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            const key = this.dataset.popup;
            openModal(key);
        });
    });
}

// Console branding
console.log('%c hitit.ai ', 'background: #bb9af7; color: #1a1b26; font-size: 24px; font-weight: bold; padding: 10px 20px; border-radius: 8px;');
console.log('%c AI Education for the Thoughtful Mind ', 'color: #7dcfff; font-size: 14px;');
console.log('%c Press R to reset calculator, C to clear checklist ', 'color: #565f89; font-size: 12px;');
