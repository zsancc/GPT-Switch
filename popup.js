document.addEventListener('DOMContentLoaded', function () {
    const setCookieBtn = document.getElementById('set-cookie-btn');
    const importCookiesBtn = document.getElementById('import-cookies-btn');
    const clearStorageBtn = document.getElementById('clear-storage-btn');
    const addAccountBtn = document.getElementById('add-account-btn');
    const refreshPageBtn = document.getElementById('refresh-page-btn');
    const fileInput = document.getElementById('file-input');
    const currentAccountLabel = document.getElementById('current-account');
    const accountsTableBody = document.getElementById('accounts-table').getElementsByTagName('tbody')[0];
  
    let accounts = [];
    let currentAccountIndex = -1;
  
    // Load accounts from Chrome storage
    chrome.storage.local.get(['accounts', 'currentAccount'], data => {
      if (data.accounts) {
        accounts = Object.entries(data.accounts);
        renderAccounts();
      }
      if (data.currentAccount !== null) {
        currentAccountIndex = data.currentAccount;
        updateCurrentAccountLabel();
      }
    });
  
    setCookieBtn.addEventListener('click', () => {
      if (accounts.length === 0) return;
      currentAccountIndex = (currentAccountIndex + 1) % accounts.length;
      const [email, token] = accounts[currentAccountIndex];
  
      // Calculate expiration date (80 days from now)
      const expirationDate = new Date();
      expirationDate.setDate(expirationDate.getDate() + 80);
  
      // Remove existing cookie
      chrome.cookies.remove({ url: 'https://chatgpt.com', name: '__Secure-next-auth.session-token' }, () => {
        // Set new cookie
        const cookieDetails = {
          url: 'https://chatgpt.com',
          name: '__Secure-next-auth.session-token',
          value: token,
          secure: true,
          expirationDate: expirationDate.getTime() / 1000
        };
  
        setTimeout(() => {
          chrome.cookies.set(cookieDetails, () => {
            updateCurrentAccountLabel();
            chrome.storage.local.set({ currentAccount: currentAccountIndex });
          });
        }, 300); // 延迟 100 毫秒执行
      });
    });
  
    importCookiesBtn.addEventListener('click', () => {
      fileInput.click();
    });
  
    fileInput.addEventListener('change', (event) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const data = JSON.parse(e.target.result);
          accounts = Object.entries(data);
          chrome.storage.local.set({ accounts: data }, () => {
            renderAccounts();
          });
        };
        reader.readAsText(file);
      }
    });
  
    clearStorageBtn.addEventListener('click', () => {
      chrome.storage.local.clear(() => {
        accounts = [];
        currentAccountIndex = -1;
        renderAccounts();
        updateCurrentAccountLabel();
      });
    });
  
    addAccountBtn.addEventListener('click', () => {
      const email = prompt('Enter Email:');
      const token = prompt('Enter Token:');
      if (email && token) {
        accounts.push([email, token]);
        saveAccounts();
        renderAccounts();
      }
    });

    refreshPageBtn.addEventListener('click', () => {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
          if (tabs[0]) {
            chrome.tabs.reload(tabs[0].id);
          }
        });
      });

  
    function updateCurrentAccountLabel() {
      if (currentAccountIndex === -1) {
        currentAccountLabel.textContent = '当前账户: None';
      } else {
        const [email] = accounts[currentAccountIndex];
        currentAccountLabel.textContent = `当前账户: ${email}`;
      }
    }
  
    function renderAccounts() {
      accountsTableBody.innerHTML = '';
      accounts.forEach(([email, token], index) => {
        const row = accountsTableBody.insertRow();
        row.insertCell(0).textContent = email;
        row.insertCell(1).textContent = `${token.slice(0, 10)}...`;
        const actionsCell = row.insertCell(2);
  
        const editBtn = document.createElement('button');
        editBtn.textContent = '编辑';
        editBtn.addEventListener('click', () => {
          const newEmail = prompt('编辑Email:', email);
          const newToken = prompt('编辑Token:', token);
          if (newEmail && newToken) {
            accounts[index] = [newEmail, newToken];
            saveAccounts();
            renderAccounts();
          }
        });
        actionsCell.appendChild(editBtn);
  
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = '删除';
        deleteBtn.addEventListener('click', () => {
          accounts.splice(index, 1);
          saveAccounts();
          renderAccounts();
        });
        actionsCell.appendChild(deleteBtn);
      });
    }
  
    function saveAccounts() {
      const data = Object.fromEntries(accounts);
      chrome.storage.local.set({ accounts: data });
    }
  });
  