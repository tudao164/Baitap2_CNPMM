document.addEventListener('DOMContentLoaded', () => {
  fetchUsers();

  document.getElementById('createForm').onsubmit = async function (e) {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(this));
    await fetch('/user/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    fetchUsers();
    this.reset();
  };
});

async function fetchUsers() {
  const res = await fetch('/user/list');
  const users = await res.json();
  const list = document.getElementById('userList');
  list.innerHTML = '';
  users.forEach(u => {
    const li = document.createElement('li');
    li.className = 'list-group-item user-item';
    li.innerHTML = `
      <div class="row align-items-center">
        <div class="col-md-8">
          <strong>${u.fullName}</strong> <span class="text-muted">(${u.email})</span><br>
          <small>Phone: ${u.phone || ''} | Address: ${u.address || ''}</small>
        </div>
        <div class="col-md-4 text-end user-actions">
          <button class="btn btn-sm btn-warning" onclick="showUpdateForm('${u._id}', '${u.fullName}', '${u.email}', '${u.phone || ''}', '${u.address || ''}')">Edit</button>
          <button class="btn btn-sm btn-danger" onclick="deleteUser('${u._id}')">Delete</button>
        </div>
      </div>
    `;
    list.appendChild(li);
  });
}

async function deleteUser(id) {
  await fetch(`/user/delete/${id}`, { method: 'DELETE' });
  fetchUsers();
}

function showUpdateForm(id, fullName, email, phone, address) {
  const updateDiv = document.getElementById('updateDiv');
  updateDiv.innerHTML = `
    <div class="card card-body mb-3">
      <h5 class="mb-3">Update User</h5>
      <form id="updateForm" class="row g-2">
        <div class="col-md-6">
          <input name="fullName" class="form-control" value="${fullName}" required>
        </div>
        <div class="col-md-6">
          <input name="email" class="form-control" value="${email}" required>
        </div>
        <div class="col-md-6">
          <input name="phone" class="form-control" value="${phone}">
        </div>
        <div class="col-md-6">
          <input name="address" class="form-control" value="${address}">
        </div>
        <div class="col-md-12">
          <input name="password" class="form-control" placeholder="New Password">
        </div>
        <div class="col-12 text-end">
          <button type="submit" class="btn btn-success">Update</button>
          <button type="button" class="btn btn-secondary" onclick="hideUpdateForm()">Cancel</button>
        </div>
      </form>
    </div>
  `;
  document.getElementById('updateForm').onsubmit = async function (e) {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(this));
    await fetch(`/user/update/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    hideUpdateForm();
    fetchUsers();
  };
}

function hideUpdateForm() {
  document.getElementById('updateDiv').innerHTML = '';
}