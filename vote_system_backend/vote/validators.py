from re import compile as recompile
from django.forms import ValidationError


class PasswordValidator:
    pin_regex = recompile('^[0-9]*$')

    def validate(self, password, user=None):
        if not self.pin_regex.fullmatch(password):
            raise ValidationError('The password must contain numbers')

    def get_help_text(self):
        return "Your password must contain only numbers."
