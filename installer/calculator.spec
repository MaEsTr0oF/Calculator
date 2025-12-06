Name: modular-calculator
Version: 1.0
Release: 1
Summary: A modular calculator built with modern JavaScript.
Summary(ru): Модульный калькулятор, созданный на современном JavaScript.
License: MIT
URL: https://github.com/MaEsTr0oF/Calculator
Group: Applications/Productivity
Source0: %{name}-%{version}.tar.gz
BuildArch: noarch
BuildRoot: %{_tmppath}/%{name}-%{version}-%{release}-root-%(%{__id_u} -n)

%description
A calculator built with modern JavaScript (ES6+), using the module pattern 
to separate concerns and improve code organization.

%description -l ru
Калькулятор, построенный на современном JavaScript (ES6+), использующий 
модульный паттерн для разделения ответственности и улучшения организации кода.

%prep
%setup -q

%build

%install
rm -rf %{buildroot}
install -d %{buildroot}%{_datadir}/%{name}
install -m 644 index.html %{buildroot}%{_datadir}/%{name}/
cp -r css %{buildroot}%{_datadir}/%{name}/
cp -r js %{buildroot}%{_datadir}/%{name}/
install -m 644 README.md %{buildroot}%{_datadir}/%{name}/

%files
%defattr(-,root,root,-)
%dir %{_datadir}/%{name}
%{_datadir}/%{name}/index.html
%{_datadir}/%{name}/css
%{_datadir}/%{name}/js
%{_datadir}/%{name}/README.md

%clean
rm -rf %{buildroot}

%changelog
* Thu Dec 05 2025 Antigravity <antigravity@example.com> - 1.0-1
- Initial package
