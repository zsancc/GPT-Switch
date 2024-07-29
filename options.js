document.addEventListener('DOMContentLoaded', function() {
    loadAccounts();
});

function loadAccounts() {
    chrome.storage.local.get(['cookieData'], function(result) {
        const accounts = result.cookieData || {};
        const tbody = document.querySelector('#accountTable tbody');
        tbody.innerHTML = '';

        for (const [account, [expiration, token]] of Object.entries(accounts)) {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${account}</td>
                <td>${expiration}</td>
                <td>${token}</td>
                <td>
                    <button onclick="editAccount('${account}')">Edit</button>
                    <button onclick="deleteAccount('${account}')">Delete</button>
                </td>
            `;
            tbody.appendChild(row);
        }
    });
}

function addAccount() {
    document.getElementById('addAccountForm').style.display = 'block';
}

function cancelAdd() {
    document.getElementById('addAccountForm').style.display = 'none';
}

function saveAccount() {
    const newAccount = document.getElementById('newAccount').value;
    const newExpiration = document.getElementById('newExpiration').value;
    const newToken = document.getElementById('newToken').value;

    if (!newAccount || !newExpiration || !newToken) {
        alert('All fields are required!');
        return;
    }

    chrome.storage.local.get(['cookieData'], function(result) {
        const accounts = result.cookieData || {};
        accounts[newAccount] = [newExpiration, newToken];
        chrome.storage.local.set({cookieData: accounts}, function() {
            loadAccounts();
            cancelAdd();
        });
    });
}

function editAccount(account) {
    chrome.storage.local.get(['cookieData'], function(result) {
        const accounts = result.cookieData || {};
        const [expiration, token] = accounts[account];

        document.getElementById('newAccount').value = account;
        document.getElementById('newExpiration').value = expiration;
        document.getElementById('newToken').value = token;

        deleteAccount(account);
        document.getElementById('addAccountForm').style.display = 'block';
    });
}

function deleteAccount(account) {
    chrome.storage.local.get(['cookieData'], function(result) {
        const accounts = result.cookieData || {};
        delete accounts[account];
        chrome.storage.local.set({cookieData: accounts}, function() {
            loadAccounts();
        });
    });
}