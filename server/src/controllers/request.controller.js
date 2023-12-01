const smtpTransport = require("../config/email");
const db = require("../models");
const { EMAIL_USER } = require("../common");
const { request: Request } = db;
const { counsel: Counsel } = db;
const { user: User } = db;

exports.requestLawyerCounsel = async (req, res) => {
  try {
    const { userId, counselId } = req.body;
    const resultRequest = await Request.findOne({ userId, counselId });
    if (resultRequest) {
      return res
        .status(400)
        .json({ message: "이미 전화 상담 신청이 접수된 사건입니다." });
    }
    const resultCounsel = await Counsel.findOne({ _id: counselId });
    if (!resultCounsel) {
      return res.json({ message: "해당 상담 사례는 삭제되었습니다." });
    }
    const { title, name, phone, desc } = resultCounsel;

    const resultUser = await User.findOne({ _id: userId });
    if (!resultUser) {
      return res.json({ message: "해당 변호사는 탈퇴한 변호사입니다." });
    }
    const { email } = resultUser;
    const newRequest = new Request({
      title,
      name,
      phone,
      userId,
      counselId,
      desc,
    });
    await newRequest.save();
    smtpTransport.sendMail({
      from: EMAIL_USER,
      to: email,
      subject: `[LawLine] 전화 상담 신청이 접수되었습니다.`,
      html: `<table style="margin:40px auto 20px;text-align:left;border-collapse:collapse;border:0;width:600px;padding:64px 16px;box-sizing:border-box">
      <tbody>
        <tr>
          <td>
            <a href="https://lawline.co.kr/" style="display:inline-block;width:145px" target="_blank">
              <img style="width: 150px;" src="https://lawline-bucket.s3.ap-northeast-2.amazonaws.com/Logo.png" alt="fastcampus" class="CToWUd" data-bit="iit">
            </a>
            <p style="padding-top:48px;font-weight:700;font-size:20px;line-height:1.5;color:#222">
              전화 상담 신청이 접수되었습니다.
            </p>
            <p style="font-size:16px;font-weight:400;line-height:1.5;padding-top:16px">
              상담 링크 : https://lawline.co.kr/counsel/${counselId}
            </p>
            <div style="margin-top:48px;font-size:16px;font-weight:400;line-height:1.5;border-radius:8px;background:#d3ffdb;color:#595959;padding:16px 20px">
              <span class="il">상담</span><span class="il">접수</span><span class="il">내역</span><br><br>
              <b style="font-size:18px;color:#222;font-weight:700;letter-spacing:1.92px">상담 제목 : ${title}</b><br><br>
              <b style="font-size:18px;color:#222;font-weight:700;letter-spacing:1.92px">신청인 성함 : ${name}</b><br><br>
              <b style="font-size:18px;color:#222;font-weight:700;letter-spacing:1.92px">신청인 전화번호 : ${phone}</b><br><br>
              <b style="font-size:18px;color:#222;font-weight:700;letter-spacing:1.92px">상담 내용 : ${desc}</b><br><br>
            </div>
          </td>
        </tr>
        <tr>
          <td style="padding-top:48px" colspan="2">
            <div style="padding:24px;background:#f2f2f2;border-radius:8px">
              <span style="font-size:14px;font-weight:400;line-height:1.5;color:#222">
                본 메일은 발신전용으로 회신되지 않습니다.<br>
                문의사항은 로라인 고객센터를 이용해주세요!
              </span>
              <hr style="margin:20px 0;border-color:#d9d9d9;border-style:solid;border-width:1px 0 0 0">
              <span style="display:block;font-size:14px;line-height:1.5;color:#595959">
                <b style="margin-right:14px">고객센터 운영시간</b>
                <p style="margin-bottom:16px">평일 10:00~18:00 (주말 및 공휴일 제외/점심시간 12:00~13:00)</p>
                <a href="https://lawline.co.kr/" rel="noreferrer" style="background:#404040;text-decoration:none;padding:5px 12px;font-size:14px;color:#fff;font-weight:400;border-radius:4px" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://day1fastcampussupport.zendesk.com/hc/ko&amp;source=gmail&amp;ust=1701484995160000&amp;usg=AOvVaw0URRCXBKT0636XK3mtRetw">고객센터 문의하기</a>
              </span>
            </div>
          </td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td style="padding-top:48px">
            <hr style="margin:8px 0;border-color:#d9d9d9;border-style:solid;border-width:1px 0 0 0">
          </td>
        </tr>
        <tr>
          <td style="padding-top:8px;font-size:12px;font-style:normal;font-weight:400;line-height:1.5;color:#222">
            <img style="width: 100px;" src="https://lawline-bucket.s3.ap-northeast-2.amazonaws.com/Logo.png" alt="fastcampus" class="CToWUd" data-bit="iit">
            <p>위바이브(주)</p>
            <p>서울특별시 금천구 가산디지털2로 67, 9층 902호(가산동, 에이스 하이엔드타워7)</p>
          </td>
        </tr>
      </tfoot>
    </table>`,
    });
    res.status(200).json({ message: "전화 상담 신청이 완료되었습니다." });
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({ message: "Server error" });
  }
};
