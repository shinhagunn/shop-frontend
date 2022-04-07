import Button from '~/components/Button';
import Input from '~/components/Input';
import '~/assets/styles/layouts/register_email.less';

function RegisterEmail() {
  return (
    <div className="container wide ">
      <hr />
      <div className="flex justify-between items-center py-12">
        <div className="title">
          <h3 className="text-2xl font-bold">ĐĂNG KÝ NHẬN EMAIL</h3>
        </div>
        <div className="email-form">
          <Input placeholder="Email ..." type="text" />
          <Button className="btn-color btn-icon btn-hover text-white">
            ĐĂNG KÝ
          </Button>
        </div>
      </div>
    </div>
  );
}

export default RegisterEmail;
