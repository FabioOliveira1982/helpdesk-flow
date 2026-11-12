const STORAGE_KEY="helpdesk-flow-tickets";
const initialTickets=[
{id:1001,requester:"Maria Silva",title:"Computador lento",category:"Hardware",priority:"Alta",status:"Aberto",description:"Computador apresenta lentidão durante o uso.",date:"2026-11-10"},
{id:1002,requester:"João Santos",title:"Problema de acesso ao sistema",category:"Software",priority:"Média",status:"Em andamento",description:"Usuário não consegue acessar o sistema.",date:"2026-11-11"},
{id:1003,requester:"Ana Costa",title:"Instalação de impressora",category:"Impressora",priority:"Baixa",status:"Resolvido",description:"Instalação e configuração de impressora.",date:"2026-11-12"}];
function loadTickets(){try{const saved=localStorage.getItem(STORAGE_KEY);return saved?JSON.parse(saved):initialTickets}catch(error){console.error("Erro ao carregar chamados:",error);return initialTickets}}
let tickets=loadTickets();
const form=document.querySelector("#ticket-form"),ticketList=document.querySelector("#ticket-list"),searchInput=document.querySelector("#search"),statusFilter=document.querySelector("#status-filter"),priorityFilter=document.querySelector("#priority-filter");
function saveTickets(){localStorage.setItem(STORAGE_KEY,JSON.stringify(tickets))}
function escapeHTML(value){return String(value).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[c]))}
function formatDate(date){const [year,month,day]=date.split("-");return `${day}/${month}/${year}`}
function renderStats(){document.querySelector("#total-count").textContent=tickets.length;document.querySelector("#open-count").textContent=tickets.filter(t=>t.status==="Aberto").length;document.querySelector("#progress-count").textContent=tickets.filter(t=>t.status==="Em andamento").length;document.querySelector("#resolved-count").textContent=tickets.filter(t=>t.status==="Resolvido").length}
function renderTickets(){
 const term=searchInput.value.trim().toLowerCase(),selectedStatus=statusFilter.value,selectedPriority=priorityFilter.value;
 const filtered=tickets.filter(t=>[t.id,t.requester,t.title,t.category].join(" ").toLowerCase().includes(term)&&(!selectedStatus||t.status===selectedStatus)&&(!selectedPriority||t.priority===selectedPriority));
 document.querySelector("#result-count").textContent=`${filtered.length} registro(s)`;document.querySelector("#empty-state").hidden=filtered.length>0;
 ticketList.innerHTML=filtered.map(t=>`<tr><td class="ticket-id">#${t.id}</td><td>${escapeHTML(t.requester)}</td><td><strong>${escapeHTML(t.title)}</strong><br><small>${escapeHTML(t.category)}</small></td><td><span class="pill priority-${t.priority}">${t.priority}</span></td><td><select class="status-select" data-action="status" data-id="${t.id}" aria-label="Alterar status do chamado ${t.id}"><option ${t.status==="Aberto"?"selected":""}>Aberto</option><option ${t.status==="Em andamento"?"selected":""}>Em andamento</option><option ${t.status==="Resolvido"?"selected":""}>Resolvido</option></select></td><td>${formatDate(t.date)}</td><td><button class="delete-button" data-action="delete" data-id="${t.id}" aria-label="Excluir chamado ${t.id}">Excluir</button></td></tr>`).join("");
 renderStats();
}
form.addEventListener("submit",event=>{
 event.preventDefault();const data=new FormData(form);
 const newTicket={id:Date.now(),requester:data.get("requester").trim(),title:data.get("title").trim(),category:data.get("category"),priority:data.get("priority"),description:data.get("description").trim(),status:"Aberto",date:new Date().toLocaleDateString("en-CA")};
 if(!newTicket.requester||!newTicket.title||!newTicket.description)return;
 tickets.unshift(newTicket);saveTickets();form.reset();document.querySelector("#priority").value="Média";document.querySelector("#form-feedback").textContent=`Chamado #${newTicket.id} registrado com sucesso!`;renderTickets();document.querySelector("#chamados").scrollIntoView({behavior:"smooth"});
});
ticketList.addEventListener("change",event=>{const select=event.target.closest('[data-action="status"]');if(!select)return;const ticket=tickets.find(t=>t.id===Number(select.dataset.id));if(ticket){ticket.status=select.value;saveTickets();renderTickets()}});
ticketList.addEventListener("click",event=>{const button=event.target.closest('[data-action="delete"]');if(!button)return;const id=Number(button.dataset.id);if(!window.confirm(`Deseja realmente excluir o chamado #${id}?`))return;tickets=tickets.filter(t=>t.id!==id);saveTickets();renderTickets()});
searchInput.addEventListener("input",renderTickets);statusFilter.addEventListener("change",renderTickets);priorityFilter.addEventListener("change",renderTickets);
document.querySelector("#open-form").addEventListener("click",()=>{document.querySelector("#novo-chamado").scrollIntoView({behavior:"smooth"});document.querySelector("#requester").focus()});
renderTickets();