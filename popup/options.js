// Feature Dialog System
const features = [
    {
        id: 'hotkeys',
        title: 'Hotkeys',
        icon: '⌨️',
        description: 'Configure keyboard shortcuts for quick actions. These hotkeys don\'t work in chat.',
        render: renderHotkeys,
        save: saveHotkeys
    },
    {
        id: 'buttons',
        title: 'Buttons Manager',
        icon: '🎮',
        description: 'Customize the appearance and visibility of game interface buttons.',
        render: renderButtons,
        save: saveButtons
    },
    {
        id: 'translator',
        title: 'Chat Translator',
        icon: '🌐',
        description: 'Translate chat messages. Double-click messages to translate them. Use Ctrl+Enter to translate your input.',
        render: renderTranslator,
        save: saveTranslator
    },
    {
        id: 'favorite-ships',
        title: 'Favourite Ships',
        icon: '🚀',
        description: 'Create quick access buttons for your favorite ships.',
        render: renderFavoriteShips,
        save: () => {} // Saves on individual add/edit/remove
    },
    {
        id: 'favorite-phrases',
        title: 'Favourite Phrases',
        icon: '💬',
        description: 'Save frequently used messages for quick access in chat.',
        render: renderFavoritePhrases,
        save: () => {} // Saves on individual add/edit/remove
    },
    {
        id: 'emergency-ping',
        title: 'Emergency Distress Ping',
        icon: '🚨',
        description: 'Quickly send emergency messages to Discord webhooks with ship details and invites.',
        render: renderEmergencyPing,
        save: () => {} // Saves on individual add/edit/remove
    },
    {
        id: 'gravity',
        title: 'Gravity Save',
        icon: '⬇️',
        description: 'Save and auto-apply gravity direction for specific ships.',
        render: renderGravity,
        save: () => {} // Saves on individual add/edit/remove
    },
    {
        id: 'texture-pack',
        title: 'Texture Pack',
        icon: '🎨',
        description: 'Upload and apply custom texture packs to change the game\'s appearance.',
        render: renderTexturePack,
        save: () => {} // Handled by file upload
    },
    {
        id: 'snakecopter',
        title: 'Snakecopter',
        icon: '🐍',
        description: 'Configure the duration for the snakecopter movement effect.',
        render: renderSnakecopter,
        save: saveSnakecopter
    },
    {
        id: 'scrollbar',
        title: 'Scrollbar Theme',
        icon: '📜',
        description: 'Customize the appearance of scrollbars throughout the interface.',
        render: renderScrollbar,
        save: saveScrollbar
    },
    {
        id: 'ui-theme',
        title: 'UI Theme',
        icon: '🎨',
        description: 'Customize the main color and opacity of the user interface.',
        render: renderUITheme,
        save: saveUITheme
    },
    {
        id: 'chat-height',
        title: 'Chat Max Height',
        icon: '💬',
        description: 'Adjust the maximum height of the chat window.',
        render: renderChatHeight,
        save: saveChatHeight
    }
];

let currentFeatureIndex = 0;
const dialog = document.getElementById('feature-dialog');
const dialogContent = document.getElementById('dialog-content');
const dialogTitle = document.getElementById('dialog-title');
const dialogDescription = document.getElementById('dialog-description');
const nav = document.querySelector('nav');

// Initialize feature buttons
function initFeatureButtons() {
    const grid = document.getElementById('features-grid');
    features.forEach((feature, index) => {
        const button = document.createElement('div');
        button.className = 'feature-button';
        button.innerHTML = `<span class="feature-icon">${feature.icon}</span><span>${feature.title}</span>`;
        button.onclick = () => openFeature(index);
        grid.appendChild(button);
    });
}

// Open feature dialog
function openFeature(index) {
    currentFeatureIndex = index;
    const feature = features[index];
    
    // Show dialog and make nav scrolled
    dialog.classList.add('active');
    nav.classList.add('scrolled');
    document.body.style.overflow = 'hidden';
    
    // Update dialog content
    dialogTitle.textContent = `${feature.icon} ${feature.title}`;
    dialogDescription.textContent = feature.description;
    
    // Render feature content
    dialogContent.innerHTML = '';
    feature.render(dialogContent);
    
    // Update navigation buttons
    updateNavButtons();
}

// Close dialog
function closeDialog() {
    dialog.classList.remove('active');
    nav.classList.remove('scrolled');
    document.body.style.overflow = '';
}

// Navigate between features
function navigateFeature(direction) {
    currentFeatureIndex += direction;
    if (currentFeatureIndex < 0) currentFeatureIndex = features.length - 1;
    if (currentFeatureIndex >= features.length) currentFeatureIndex = 0;
    openFeature(currentFeatureIndex);
}

// Update navigation buttons
function updateNavButtons() {
    const prevBtn = document.getElementById('prev-feature');
    const nextBtn = document.getElementById('next-feature');
    const prevFeature = features[(currentFeatureIndex - 1 + features.length) % features.length];
    const nextFeature = features[(currentFeatureIndex + 1) % features.length];
    
    prevBtn.title = prevFeature.title;
    nextBtn.title = nextFeature.title;
}

// Save current feature
function saveCurrentFeature() {
    const feature = features[currentFeatureIndex];
    if (feature.save) {
        feature.save();
    }
}

// Dialog event listeners
document.getElementById('close-dialog').onclick = closeDialog;
document.getElementById('prev-feature').onclick = () => navigateFeature(-1);
document.getElementById('next-feature').onclick = () => navigateFeature(1);

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (!dialog.classList.contains('active')) return;
    
    if (e.key === 'Escape') closeDialog();
    else if (e.key === 'ArrowLeft') navigateFeature(-1);
    else if (e.key === 'ArrowRight') navigateFeature(1);
});

// Scroll animation for nav (when not in dialog)
window.addEventListener('scroll', () => {
    if (dialog.classList.contains('active')) return;
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

// Initialize
initFeatureButtons();

// ===== FEATURE RENDERERS =====

function renderHotkeys(container) {
    chrome.storage.sync.get("key", (result) => {
        let arr = result.key || [1, "q", "r", "", "", ""];
        
        container.innerHTML = `
            <div class="feature-settings">
                <div class="setting-group">
                    <label>Hotkey Modifier:</label>
                    <select id="fkey">
                        <option value="0">CTRL</option>
                        <option value="1">SHIFT</option>
                    </select>
                </div>
                
                <div class="setting-group">
                    <label>Exit:</label>
                    <input type="text" id="exit" maxlength="1" value="${arr[1]}">
                </div>
                
                <div class="setting-group">
                    <label>Rejoin:</label>
                    <input type="text" id="rejoin" maxlength="1" value="${arr[2]}">
                </div>
                
                <div class="setting-group">
                    <label>Snakecopter:</label>
                    <input type="text" id="copter" maxlength="1" value="${arr[3]}">
                </div>
                
                <div class="setting-group">
                    <label>Save Ship:</label>
                    <input type="text" id="saveship" maxlength="1" value="${arr[4]}">
                </div>
                
                <div class="setting-group">
                    <label>Swap TXT:</label>
                    <input type="text" id="swaptxt" maxlength="1" value="${arr[5]}">
                </div>
                
                <div class="info-text">
                    <p>ℹ️ Additional keybinds:</p>
                    <ul>
                        <li>Gravity buttons: Arrow keys</li>
                        <li>Ship manager: Tab</li>
                        <li>Translate chat input: CTRL+ENTER</li>
                        <li>Leave empty to disable</li>
                    </ul>
                </div>
                
                <button class="btn-primary" onclick="saveCurrentFeature()">Save Hotkeys</button>
            </div>
        `;
        
        document.querySelector('#fkey').value = arr[0];
    });
}

function saveHotkeys() {
    const keys = [parseInt(document.getElementById("fkey").value)];
    const keyInputs = ['exit', 'rejoin', 'copter', 'saveship', 'swaptxt'];
    
    keyInputs.forEach(id => {
        keys.push(document.getElementById(id).value.toLowerCase().trim());
    });
    
    // Validation
    if (!keys[0]) {
        for (let i = 1; i < keys.length; i++) {
            if (keys[i] && !/[bimq,./;'\[\]]$/i.test(keys[i])) {
                return showNotification("With CTRL, keys must be one of: b i m q , . / ; ' [ ]", false);
            }
        }
    } else {
        for (let i = 1; i < keys.length; i++) {
            if (keys[i] && !/[a-zA-Z]$/i.test(keys[i])) {
                return showNotification("With SHIFT, keys must be letters a-z", false);
            }
        }
    }
    
    // Check for duplicates
    const nonEmptyKeys = keys.slice(1).filter(k => k !== '');
    if (new Set(nonEmptyKeys).size !== nonEmptyKeys.length) {
        return showNotification("Each key can only be used once!", false);
    }
    
    chrome.storage.sync.set({ key: keys });
    showNotification("Hotkeys saved successfully!");
}

function renderButtons(container) {
    const defaultButtons = {
        'Save': [true, 'red', null],
        'Invite': [true, 'purple', null],
        'Help': [true, 'green', null],
        'Settings': [true, 'yellow', null],
        'Cheat Menu': [true, 'grey', null],
        'Manage Ship': [true, 'blue', null],
        'Rejoin Ship': [true, 'orange', null],
        'Exit Ship': [true, 'red', null],
    };
    
    chrome.storage.sync.get('buttons', (result) => {
        const buttons = result.buttons || defaultButtons;
        
        let html = '<div class="feature-settings"><table class="buttons-table"><thead><tr><th>Button</th><th>Text</th><th>Color</th><th>Show</th></tr></thead><tbody>';
        
        for (const [btn, options] of Object.entries(buttons)) {
            html += `
                <tr data-button="${btn}">
                    <td>${btn}</td>
                    <td><input type="text" class="btn-text" value="${options[2] || btn}"></td>
                    <td>
                        <select class="btn-color btn-${options[1]}">
                            ${['red', 'green', 'blue', 'white', 'black', 'grey', 'yellow', 'orange', 'purple', 'darkBlue'].map(c => 
                                `<option value="${c}" ${c === options[1] ? 'selected' : ''}>${c}</option>`
                            ).join('')}
                        </select>
                    </td>
                    <td><input type="checkbox" class="btn-show" ${options[0] ? 'checked' : ''}></td>
                </tr>
            `;
        }
        
        html += '</tbody></table><div class="button-actions"><button class="btn-primary" onclick="saveCurrentFeature()">Save</button><button class="btn-secondary" onclick="restoreDefaultButtons()">Restore Default</button></div></div>';
        
        container.innerHTML = html;
        
        // Add color change listeners
        container.querySelectorAll('.btn-color').forEach(select => {
            select.onchange = function() {
                this.className = `btn-color btn-${this.value}`;
            };
        });
    });
}

function saveButtons() {
    const buttons = {};
    document.querySelectorAll('.buttons-table tbody tr').forEach(row => {
        const btnName = row.dataset.button;
        const text = row.querySelector('.btn-text').value;
        const color = row.querySelector('.btn-color').value;
        const show = row.querySelector('.btn-show').checked;
        buttons[btnName] = [show, color, text === btnName ? null : text];
    });
    
    chrome.storage.sync.set({ buttons });
    showNotification("Buttons saved successfully!");
}

function restoreDefaultButtons() {
    chrome.storage.sync.remove('buttons').then(() => {
        renderButtons(document.getElementById('dialog-content'));
        showNotification("Buttons restored to default!");
    });
}

function renderTranslator(container) {
    chrome.storage.sync.get("transl", (result) => {
        const transl = result.transl || ['en', 'en', false];
        
        container.innerHTML = `
            <div class="feature-settings">
                <div class="info-text">
                    <p>📖 <a href="https://cloud.google.com/translate/docs/languages" target="_blank">Language codes reference</a></p>
                </div>
                
                <div class="setting-group">
                    <label>Translate chat to:</label>
                    <input type="text" id="langIn-input" maxlength="4" value="${transl[0]}" placeholder="en">
                </div>
                
                <div class="setting-group">
                    <label>Translate my messages to:</label>
                    <input type="text" id="langOut-input" maxlength="4" value="${transl[1]}" placeholder="en">
                </div>
                
                <div class="setting-group">
                    <label>
                        <input type="checkbox" id="lang-auto" ${transl[2] ? 'checked' : ''}>
                        Auto-translate chat (may cause lag)
                    </label>
                </div>
                
                <button class="btn-primary" onclick="saveCurrentFeature()">Save Translation Settings</button>
            </div>
        `;
    });
}

function saveTranslator() {
    const langIn = document.querySelector('#langIn-input').value || 'en';
    const langOut = document.querySelector('#langOut-input').value || 'en';
    const autoLang = document.querySelector('#lang-auto').checked || false;
    
    chrome.storage.sync.set({ transl: [langIn, langOut, autoLang] });
    showNotification("Translation settings saved!");
}

function renderFavoriteShips(container) {
    container.innerHTML = `
        <div class="feature-settings">
            <div class="setting-group">
                <label>
                    <input type="checkbox" id="favcheck">
                    Hide favourite ship from top bar
                </label>
            </div>
            
            <div class="data-table-container">
                <table id="fav-table">
                    <thead>
                        <tr>
                            <th>Button text</th>
                            <th>Ship ID</th>
                            <th>Color</th>
                            <th colspan="2">Actions</th>
                        </tr>
                    </thead>
                    <tbody></tbody>
                    <tfoot>  
                        <tr>
                            <td><input placeholder="Text" type="text"></td>
                            <td><input placeholder="Ship ID" type="text"></td>
                            <td><input placeholder="#000" type="color"></td>
                            <td colspan="2" class="add">Add button</td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    `;
    
    setupFavCheck();
    appendRows('fav', container);
    container.querySelector("#fav-table .add").onclick = () => add('fav', 'This ship ID already exists');
}

function renderFavoritePhrases(container) {
    container.innerHTML = `
        <div class="feature-settings">
            <div class="data-table-container">
                <table id="word-table">
                    <thead>
                        <tr>
                            <th>Button text</th>
                            <th>Message</th>
                            <th colspan="2">Actions</th>
                        </tr>
                    </thead>
                    <tbody></tbody>
                    <tfoot>
                        <tr>
                            <td><input placeholder="Text" type="text"></td>
                            <td><textarea placeholder="Message"></textarea></td>
                            <td colspan="2" class="add">Add</td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    `;
    
    appendRows('word', container);
    container.querySelector("#word-table .add").onclick = () => add('word', 'This button text already exists');
}

function renderEmergencyPing(container) {
    container.innerHTML = `
        <div class="feature-settings">
            <div class="info-text">
                <p>ℹ️ Ping format: Use @here or @&lt;userId&gt; (e.g., @&lt;242927492749&gt;)</p>
            </div>
            
            <div class="data-table-container">
                <table id="ping-table">
                    <thead>
                        <tr>
                            <th>Webhook URL</th>
                            <th>Button text</th>
                            <th>Message</th>
                            <th>Username</th>
                            <th colspan="2">Actions</th>
                        </tr>
                    </thead>
                    <tbody></tbody>
                    <tfoot>
                        <tr>
                            <td><input placeholder="https://discord.com/api/webhooks/..." type="url"></td>
                            <td><input placeholder="Text" type="text"></td>
                            <td><input placeholder="@here come join" type="text"></td>
                            <td><input placeholder="Distress caller" type="text"></td>
                            <td colspan="2" class="add">Add</td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    `;
    
    appendRows('ping', container);
    container.querySelector("#ping-table .add").onclick = () => add('ping', 'This webhook connection already exists');
}

function renderGravity(container) {
    container.innerHTML = `
        <div class="feature-settings">
            <div class="data-table-container">
                <table id="gravity-table">
                    <thead>
                        <tr>
                            <th>Ship ID</th>
                            <th>Gravity direction</th>
                            <th colspan="2">Actions</th>
                        </tr>
                    </thead>
                    <tbody></tbody>
                    <tfoot>
                        <tr>
                            <td><input placeholder="Ship ID" type="text"></td>
                            <td><select>
                                <option value="0">up</option>
                                <option value="1">left</option>
                                <option value="2">right</option>
                                <option value="3" selected>down</option>
                            </select></td>
                            <td colspan="2" class="add">Add</td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    `;
    
    appendRows('gravity', container);
    container.querySelector("#gravity-table .add").onclick = () => add('gravity', 'This ship ID already exists');
}

function renderTexturePack(container) {
    chrome.storage.local.get("txt", (result) => {
        container.innerHTML = `
            <div class="feature-settings">
                <div class="setting-group">
                    <input type="file" id="txt-input" accept="application/x-zip-compressed" style="display:none">
                    <label for="txt-input" class="btn-primary file-label">Choose Texture Pack</label>
                    <button id="txt-remove" class="btn-secondary">Remove Texture Pack</button>
                </div>
                
                <div class="info-text">
                    <p>Status: <strong id="txt-current">${result.txt ? 'Custom pack applied' : "Default shrek's pack"}</strong></p>
                </div>
            </div>
        `;
        
        const txtInput = container.querySelector('#txt-input');
        const txtRemove = container.querySelector('#txt-remove');
        const txtLabel = container.querySelector('#txt-current');
        
        txtInput.onchange = async function() {
            if (this.files[0].type !== 'application/x-zip-compressed' && this.files[0].type !== 'application/zip') {
                return showNotification('That is not a zip file.', false);
            }
            chrome.storage.local.set({ txt: await fileToBase64(this.files[0]) });
            showNotification('Texture pack applied!');
            txtLabel.textContent = 'Custom pack applied';
        };
        
        txtRemove.onclick = () => {
            chrome.storage.local.remove("txt");
            showNotification('Texture pack removed!');
            txtLabel.textContent = "Default shrek's pack";
        };
    });
}

function renderSnakecopter(container) {
    chrome.storage.sync.get("dur", (result) => {
        const duration = result.dur ? result.dur / 1000 : 10;
        
        container.innerHTML = `
            <div class="feature-settings">
                <div class="setting-group">
                    <label>Duration: <span id="snakeoutput">${duration}</span> seconds</label>
                    <input type="range" id="duration" min="5" max="600" value="${duration}">
                </div>
                
                <div class="info-text">
                    <p>ℹ️ Updates in game in real time</p>
                </div>
            </div>
        `;
        
        const slider = container.querySelector('#duration');
        const output = container.querySelector('#snakeoutput');
        
        slider.oninput = function() {
            output.textContent = this.value;
        };
        
        slider.onchange = function() {
            chrome.storage.sync.set({ dur: this.value * 1000 });
            showNotification('Snakecopter duration updated!');
        };
    });
}

function renderScrollbar(container) {
    chrome.storage.sync.get("colors", (result) => {
        const colors = result.colors || ["#0000004d", "#7b7b7b", ""];
        const transparent = colors[2] === '4d';
        
        container.innerHTML = `
            <div class="feature-settings">
                <div class="setting-group">
                    <label>Track Color:</label>
                    <input type="color" id="sctrack" value="${colors[0].replace('4d', '')}">
                </div>
                
                <div class="setting-group">
                    <label>Thumb Color:</label>
                    <input type="color" id="scthumb" value="${colors[1]}">
                </div>
                
                <div class="setting-group">
                    <label>
                        <input type="checkbox" id="sctrans" ${transparent ? 'checked' : ''}>
                        Transparent
                    </label>
                </div>
                
                <button class="btn-primary" onclick="saveCurrentFeature()">Save Scrollbar Theme</button>
            </div>
        `;
        
        const sctrack = container.querySelector('#sctrack');
        const scthumb = container.querySelector('#scthumb');
        const sctrans = container.querySelector('#sctrans');
        
        const previewColors = () => {
            const trans = sctrans.checked ? '4d' : '';
            document.body.style.setProperty('--scrollTrack', sctrack.value + trans);
            document.body.style.setProperty('--scrollThumb', scthumb.value);
        };
        
        sctrack.oninput = previewColors;
        scthumb.oninput = previewColors;
        sctrans.onchange = previewColors;
        
        // Initial preview
        previewColors();
    });
}

function saveScrollbar() {
    const colors = [
        document.querySelector('#sctrack').value,
        document.querySelector('#scthumb').value,
        document.querySelector('#sctrans').checked ? '4d' : ''
    ];
    
    chrome.storage.sync.set({ colors });
    showNotification('Scrollbar theme saved!');
}

function renderUITheme(container) {
    chrome.storage.sync.get("ui", (result) => {
        const ui = result.ui || ['#19232d', 0.9];
        
        container.innerHTML = `
            <div class="feature-settings">
                <div class="setting-group">
                    <label>Main Color:</label>
                    <input type="color" id="uicolor" value="${ui[0]}">
                </div>
                
                <div class="setting-group">
                    <label>Opacity: <span id="uiopacity-value">${ui[1]}</span></label>
                    <input type="range" id="uiopacity" min="0" max="1" step="0.1" value="${ui[1]}">
                </div>
                
                <div class="button-actions">
                    <button class="btn-primary" onclick="saveCurrentFeature()">Save UI Theme</button>
                    <button class="btn-secondary" onclick="resetUITheme()">Default</button>
                </div>
            </div>
        `;
        
        const opacitySlider = container.querySelector('#uiopacity');
        const opacityValue = container.querySelector('#uiopacity-value');
        
        opacitySlider.oninput = function() {
            opacityValue.textContent = this.value;
        };
    });
}

function saveUITheme() {
    const uiColor = [
        document.querySelector('#uicolor').value,
        parseFloat(document.querySelector('#uiopacity').value)
    ];
    
    chrome.storage.sync.set({ ui: uiColor });
    showNotification('UI theme saved!');
}

function resetUITheme() {
    document.querySelector('#uicolor').value = '#19232d';
    document.querySelector('#uiopacity').value = 0.9;
    document.querySelector('#uiopacity-value').textContent = '0.9';
    saveUITheme();
}

function renderChatHeight(container) {
    chrome.storage.sync.get("chatmaxheight", (result) => {
        const height = result.chatmaxheight || 300;
        
        container.innerHTML = `
            <div class="feature-settings">
                <div class="setting-group">
                    <label>Max Chat Height (px):</label>
                    <input type="number" id="chatmaxheight" min="50" max="2000" value="${height}">
                </div>
                
                <div class="button-actions">
                    <button class="btn-primary" onclick="saveCurrentFeature()">Save</button>
                    <button class="btn-secondary" onclick="resetChatHeight()">Default (300px)</button>
                </div>
            </div>
        `;
    });
}

function saveChatHeight() {
    const height = parseInt(document.querySelector('#chatmaxheight').value);
    
    if (height < 50) return showNotification('Height can\'t be lower than 50px!', false);
    if (height > 2000) return showNotification('Height can\'t be higher than 2000px!', false);
    
    chrome.storage.sync.set({ chatmaxheight: height });
    showNotification('Chat height saved!');
}

function resetChatHeight() {
    document.querySelector('#chatmaxheight').value = 300;
    chrome.storage.sync.remove('chatmaxheight');
    showNotification('Chat height restored to default!');
}

// ===== SHARED TABLE FUNCTIONS =====

const collectionConfig = {
    'word': { keyIndex: 0, hasOptions: false, selectOptions: false },
    'ping': { keyIndex: 0, hasOptions: false, selectOptions: false },
    'fav': { keyIndex: 1, hasOptions: true, selectOptions: false },
    'gravity': { keyIndex: 0, hasOptions: false, selectOptions: ['up', 'left', 'right', 'down'] }
};

function setupFavCheck() {
    const favCheck = document.getElementById("favcheck");
    
    chrome.storage.sync.get("fav", result => {
        let btns = result.fav || [];
        if (btns.findIndex(b => b[1] == 0) !== -1) {
            favCheck.checked = true;
        }
    });
    
    favCheck.onchange = () => {
        chrome.storage.sync.get("fav", result => {
            let btns = result.fav || [];
            
            if (favCheck.checked) {
                if (!btns) btns = [['', 0, '#000000']];
                else btns.push(['', 0, '#000000']);
            } else {
                btns.splice(btns.findIndex(b => b[1] == 0), 1);
            }
            
            chrome.storage.sync.set({ fav: btns });
            showNotification('Favourite ship setting updated!');
        });
    };
}

function appendRows(collection, container) {
    const config = collectionConfig[collection];
    const table = container.querySelector(`#${collection}-table tbody`);
    if (!table) return;
    
    table.innerHTML = '';
    
    chrome.storage.sync.get(collection, result => {
        let list = result[collection];
        if (!list) return;
        
        // Remove special option items
        if (config.hasOptions) {
            list = list.filter(i => i[config.keyIndex] != 0);
        }
        
        list.forEach(item => {
            const row = document.createElement('tr');
            
            item.forEach((element, idx) => {
                const td = document.createElement('td');
                
                if (config.selectOptions && idx === 1) {
                    const select = document.createElement('select');
                    config.selectOptions.forEach((opt, optIdx) => {
                        const option = document.createElement('option');
                        option.textContent = opt;
                        option.value = optIdx;
                        select.appendChild(option);
                    });
                    select.value = element;
                    td.appendChild(select);
                } else if (element.startsWith && element.startsWith('#')) {
                    const input = document.createElement('input');
                    input.type = 'color';
                    input.value = element;
                    td.appendChild(input);
                } else {
                    const input = collection === 'word' && idx === 1 ? document.createElement('textarea') : document.createElement('input');
                    if (input.tagName === 'INPUT') input.type = 'text';
                    input.value = element;
                    td.appendChild(input);
                }
                
                row.appendChild(td);
            });
            
            // Edit button
            const editBtn = document.createElement('td');
            editBtn.textContent = 'Save';
            editBtn.className = 'action-btn edit-btn';
            editBtn.onclick = function() { edit(collection, this, item[config.keyIndex]); };
            row.appendChild(editBtn);
            
            // Remove button
            const removeBtn = document.createElement('td');
            removeBtn.textContent = 'Delete';
            removeBtn.className = 'action-btn delete-btn';
            removeBtn.onclick = function() { remove(collection, this, item[config.keyIndex]); };
            row.appendChild(removeBtn);
            
            table.appendChild(row);
        });
    });
}

function add(collection, errorMessage) {
    const config = collectionConfig[collection];
    const table = document.querySelector(`#${collection}-table`);
    const inputs = [...table.querySelectorAll('tfoot input, tfoot textarea, tfoot select')];
    
    for (const input of inputs) {
        if (input.value === '') return showNotification('Fill each input field!', false);
    }
    
    chrome.storage.sync.get(collection, result => {
        let list = result[collection] || [];
        const newItem = inputs.map(i => i.value);
        
        if (list.find(l => l[config.keyIndex] == newItem[config.keyIndex]) || newItem[config.keyIndex] == 0) {
            return showNotification(errorMessage, false);
        }
        
        list.push(newItem);
        chrome.storage.sync.set({ [collection]: list });
        
        inputs.forEach(i => i.value = '');
        showNotification('Successfully added entry!');
        appendRows(collection, table.closest('.feature-settings'));
    });
}

function remove(collection, node, id) {
    if (!confirm("Are you sure you want to remove it?")) return;
    
    const config = collectionConfig[collection];
    chrome.storage.sync.get(collection, result => {
        let list = result[collection];
        list.splice(list.findIndex(i => i[config.keyIndex] == id), 1);
        chrome.storage.sync.set({ [collection]: list });
        node.parentElement.remove();
        showNotification('Successfully removed entry!');
    });
}

function edit(collection, node, id) {
    const config = collectionConfig[collection];
    chrome.storage.sync.get(collection, result => {
        let list = result[collection];
        const inputs = node.parentElement.querySelectorAll('input, select, textarea');
        
        for (const input of inputs) {
            if (input.value === '') return showNotification('Fill each input field!', false);
        }
        
        const newValues = [...inputs].map(i => i.value);
        
        if (list.find(i => i[config.keyIndex] == newValues[config.keyIndex] && newValues[config.keyIndex] != id)) {
            return showNotification('Failed. Entry with the same key name already exists', false);
        }
        
        list[list.findIndex(i => i[config.keyIndex] == id)] = newValues;
        chrome.storage.sync.set({ [collection]: list });
        showNotification('Successfully edited entry!');
    });
}

// ===== UTILITY FUNCTIONS =====

const fileToBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
});

// Notification system
const messageContainer = document.getElementById('messageContainer');

function showNotification(text, status = true) {
    const messageWrapper = document.createElement('li');
    const message = document.createElement('p');
    message.textContent = `${text}${status ? ' - Reload game to see changes' : ''}`;
    if (!status) message.classList.add('error');
    
    messageWrapper.appendChild(message);
    messageContainer.appendChild(messageWrapper);
    
    message.onclick = () => removeMessage(message);
    
    setTimeout(() => {
        messageWrapper.classList.add('show');
        message.classList.add('show');
    }, 15);
    
    setTimeout(() => removeMessage(message), 5000);
}

function removeMessage(element) {
    element.classList.remove('show');
    element.parentElement.classList.remove('show');
    element.parentElement.ontransitionend = () => {
        element.parentElement.remove();
    };
}
