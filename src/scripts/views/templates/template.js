import { formatDate } from '../../utils/functions';

const cardSoal = (data, antrianQuestion, lastQuestion) => `
<div id="nomer_soal" class="py-3">${data.category} | ${antrianQuestion + 1} / ${lastQuestion + 1}</div>
<div class="card-body user-select-none bg-green-me text-white fs-4">${data.question}</div>



`;

const cardTemplateAnswers = (data) => `

    <div class="col-lg-6">
        <label class="border border-2 rounded mb-3">
            <input type="radio" name="choices" class="card-input-element d-none" value="${data}" />
            <div class="panel panel-default card-input p-2">
                <div class="panel-heading">${data}</div>
            </div>
        </label>
    </div>

`;

const cardHistoryScore = (data) => `
<div class="card mt-2 shadow-me border border-0">
    <div class="card-body">
        <div class="d-flex justify-content-between align-items-center px-2">
            <span class="fs-6">${formatDate(data.tanggal)}</span>
            <span class="fw-bold fs-3 text-center">${data.score.toString()}</span>
        </div>
    </div>
</div>
`;
const cardNotYetHistoryScore = () => `
<div class="card mt-2 shadow-me border border-0">
    <div class="card-body">
        <div class="d-flex justify-content-center align-items-center px-2">
            <span class="fw-bold fs-3 text-center">Tidak Ada History</span>
        </div>
    </div>
</div>
`;

const loadPage = () => `<div class="d-flex justify-content-center" style="width: 100%">
<div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
</div>`;

const circleTrueFalse = (className) => `
<span class="circle-true-false me-1 ${className}"></span>
`;

export {
  cardSoal, cardTemplateAnswers, cardHistoryScore, cardNotYetHistoryScore, loadPage, circleTrueFalse,
};
