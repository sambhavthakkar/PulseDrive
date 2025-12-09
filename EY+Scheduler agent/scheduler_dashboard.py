"""
Simple Scheduler Dashboard (single-file Flask app)

Place this file in the same folder as your existing scheduler_agent.py and bookings.json.

Features:
- Serves a static dashboard at http://localhost:5000/
- Exposes /api/bookings which reads bookings.json and returns JSON
- Simple interactive UI that fetches bookings and renders a table + timeline cards
- Auto-refresh button and live-friendly layout that's easy to extend

Run:
1. pip install flask
2. python scheduler_agent.py   # (optional) generate/update bookings.json
3. python scheduler_dashboard_app.py
4. Open http://localhost:5000 in your browser

Note: This is intentionally minimal so you can extend it into FastAPI/React later.
"""
from flask import Flask, jsonify, render_template_string, send_file
import json
import os
from datetime import datetime

BOOKINGS_FILE = "bookings.json"

app = Flask(__name__)

# ------------------ API -------------------------------------------------
@app.route('/api/bookings')
def api_bookings():
    """Return bookings.json content or a helpful error."""
    if not os.path.exists(BOOKINGS_FILE):
        return jsonify({"error": "bookings.json not found. Run scheduler_agent.py to generate it."}), 404
    try:
        with open(BOOKINGS_FILE, 'r') as f:
            data = json.load(f)
        # normalize structure: allow both list-of-bookings or {"bookings": [...]} produced by earlier demo
        if isinstance(data, dict) and 'bookings' in data:
            bookings = data['bookings']
        elif isinstance(data, list):
            bookings = data
        else:
            bookings = data.get('bookings', []) if isinstance(data, dict) else []
        return jsonify({"bookings": bookings})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# ------------------ Dashboard -------------------------------------------
INDEX_HTML = '''
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>Scheduler Dashboard</title>
  <style>
    body{font-family: Arial, Helvetica, sans-serif; margin:20px; background:#f7f8fb}
    header{display:flex;align-items:center;justify-content:space-between}
    h1{font-size:20px;margin:0}
    button{padding:8px 12px;border-radius:6px;border:1px solid #ccc;background:white;cursor:pointer}
    .grid{display:grid;grid-template-columns:1fr 360px;gap:18px;margin-top:18px}
    .card{background:white;border-radius:8px;padding:12px;box-shadow:0 1px 3px rgba(0,0,0,0.06)}
    table{width:100%;border-collapse:collapse}
    th,td{padding:8px;text-align:left;border-bottom:1px solid #eee;font-size:14px}
    .timeline{display:flex;flex-direction:column;gap:8px}
    .chip{padding:8px;border-radius:8px;background:#eef2ff;border:1px solid #d7dbff}
    .small{font-size:12px;color:#555}
    .empty{color:#888;padding:14px}
  </style>
</head>
<body>
  <header>
    <h1>Scheduler Dashboard</h1>
    <div>
      <button id="refreshBtn">Refresh</button>
      <button id="genBtn">Generate sample (if missing)</button>
    </div>
  </header>

  <div class="grid">
    <div>
      <div class="card">
        <h3>Bookings</h3>
        <div id="bookingsTable"></div>
      </div>

      <div style="height:12px"></div>

      <div class="card">
        <h3>Raw JSON</h3>
        <pre id="rawJson" style="max-height:200px;overflow:auto;background:#f4f6fb;padding:10px;border-radius:6px"></pre>
      </div>
    </div>

    <div>
      <div class="card">
        <h3>Timeline</h3>
        <div id="timeline" class="timeline"></div>
      </div>

      <div style="height:12px"></div>

      <div class="card">
        <h3>Quick Stats</h3>
        <div id="stats"></div>
      </div>
    </div>
  </div>

<script>
async function fetchBookings(){
  const res = await fetch('/api/bookings');
  if(!res.ok){
    const err = await res.json().catch(()=>({error:'unknown'}));
    return {error: err.error || 'Failed to fetch'};
  }
  return res.json();
}

function formatDate(iso){
  try{ const d=new Date(iso); return d.toLocaleString(); }catch(e){return iso}
}

function renderTable(bookings){
  if(!bookings || bookings.length===0){
    document.getElementById('bookingsTable').innerHTML = '<div class="empty">No bookings found.</div>';
    return;
  }
  let html = '<table><thead><tr><th>Vehicle</th><th>Center</th><th>Slot</th><th>Owner</th></tr></thead><tbody>';
  for(const b of bookings){
    const slot = b.slot_datetime || b.slot_dt || b.slot || '';
    const center = b.center_name || b.center || b.center_name || '';
    const owner = (b.owner && (b.owner.name || b.owner.contact)) || '';
    html += <tr><td>${b.vehicle_id||''}</td><td>${center}</td><td>${formatDate(slot)}</td><td>${owner}</td></tr>;
  }
  html += '</tbody></table>';
  document.getElementById('bookingsTable').innerHTML = html;
}

function renderTimeline(bookings){
  const node = document.getElementById('timeline'); node.innerHTML = '';
  if(!bookings || bookings.length===0){ node.innerHTML = '<div class="empty">No events to show.</div>'; return; }
  // sort by time ascending
  bookings.sort((a,b)=>{ return new Date(a.slot_datetime||a.slot_dt||0)-new Date(b.slot_datetime||b.slot_dt||0) });
  for(const b of bookings){
    const slot = b.slot_datetime || b.slot_dt || '';
    const center = b.center_name || b.center || '';
    const el = document.createElement('div'); el.className='chip';
    el.innerHTML = <strong>${b.vehicle_id||''}</strong><div class="small">${center} — ${formatDate(slot)}</div>;
    node.appendChild(el);
  }
}

function renderRaw(bookingsRaw){
  document.getElementById('rawJson').textContent = JSON.stringify(bookingsRaw, null, 2);
}

function renderStats(bookings){
  const node = document.getElementById('stats');
  if(!bookings || bookings.length===0){ node.innerHTML='<div class="small">No data</div>'; return; }
  const byCenter = {};
  for(const b of bookings){ const c = b.center_name||b.center||'Unknown'; byCenter[c]=(byCenter[c]||0)+1; }
  let html = '<ul class="small">';
  for(const k in byCenter) html += <li>${k}: ${byCenter[k]}</li>;
  html += '</ul>';
  node.innerHTML = html;
}

async function load(){
  document.getElementById('refreshBtn').disabled = true;
  const data = await fetchBookings();
  document.getElementById('refreshBtn').disabled = false;
  if(data.error){
    document.getElementById('bookingsTable').innerHTML = <div class="empty">${data.error}</div>;
    document.getElementById('rawJson').textContent = '';
    document.getElementById('timeline').innerHTML = '';
    document.getElementById('stats').innerHTML = '';
    return;
  }
  const bookings = data.bookings || [];
  renderTable(bookings);
  renderTimeline(bookings);
  renderRaw(data);
  renderStats(bookings);
}

// Hook buttons
document.addEventListener('DOMContentLoaded', ()=>{
  document.getElementById('refreshBtn').addEventListener('click', load);
  document.getElementById('genBtn').addEventListener('click', async ()=>{
    // call a helper endpoint to create a sample file if missing
    const res = await fetch('/generate_sample');
    if(res.ok){ alert('Sample bookings generated. Click Refresh.'); load(); }
    else alert('Failed to generate sample');
  });
  load();
});
</script>
</body>
</html>
'''

@app.route('/')
def index():
    return render_template_string(INDEX_HTML)

# Optional helper to generate a simple sample bookings.json if missing
@app.route('/generate_sample')
def generate_sample():
    sample = [
        {
            "vehicle_id": "V201",
            "owner": {"name": "Demo User", "contact": "demo@example.com"},
            "center_name": "Hero Service Center - North",
            "slot_datetime": datetime.now().isoformat(),
            "slot_id": "DEMO-1",
            "predicted_maintenance": [{"component":"brake","urgency":5}]
        }
    ]
    try:
        with open(BOOKINGS_FILE, 'w') as f:
            json.dump(sample, f, indent=2)
        return jsonify({"ok": True})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Let user download the bookings.json directly
@app.route('/download_bookings')
def download_bookings():
    if not os.path.exists(BOOKINGS_FILE):
        return jsonify({"error": "bookings.json not found"}), 404
    return send_file(BOOKINGS_FILE, as_attachment=True)

if __name__ == '__main__':
    app.run(debug=True, port=5000)