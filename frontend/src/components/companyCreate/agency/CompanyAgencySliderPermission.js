export const loadMenuItems = (loggedInUser, company, setMenuItems, setIsMenuLoading) => {
  setIsMenuLoading(true);
  const items = [
    {
      path: '/companyAgencyDashboard',
      icon: 'bi-speedometer2',
      text: 'Dashboard',
      id: 'dashboard'
    },
    {
      path: '/companyAgencyDashboard/companies',
      icon: 'bi-building',
      text: 'Şirketler',
      id: 'companies'
    },
    {
      path: '/companyAgencyDashboard/guides',
      icon: 'bi-person-badge',
      text: 'Rehberler',
      id: 'guides'
    },
    {
      path: '/companyAgencyDashboard/tours',
      icon: 'bi-map',
      text: 'Turlar',
      id: 'tours',
      subItems: [
        {
          path: '/companyAgencyDashboard/tours/create',
          icon: 'bi-plus-circle',
          text: 'Tur Oluştur',
          id: 'create-tour'
        },
        {
          path: '/companyAgencyDashboard/tours/listeler',
          icon: 'bi-list-ul',
          text: 'Listeler',
          id: 'listeler'
        },
        {
          path: '/companyAgencyDashboard/tours/rezervasyonlar',
          icon: 'bi-check2-circle',
          text: 'Rezervasyonlar',
          id: 'rezervasyonlar'
        }
      ]
    },
    {
      path: '/companyAgencyDashboard/reports',
      icon: 'bi-file-earmark-text',
      text: 'Raporlar',
      id: 'reports'
    },
    {
      path: '/companyAgencyDashboard/hotels',
      icon: 'bi-building-add',
      text: 'Otel Gönder',
      id: 'hotels'
    },
    {
      path: '/companyAgencyDashboard/database-backup',
      icon: 'bi-database',
      text: 'Veritabanı Yedekleme',
      id: 'backup'
    },
    {
      path: '/companyAgencyDashboard/settings',
      icon: 'bi-gear',
      text: 'Ayarlar',
      id: 'settings'
    }
  ];

  if (!loggedInUser) {
    setMenuItems([]);
    setIsMenuLoading(false);
    return;
  }

  if (loggedInUser.position === 'admin') {
    items.push({
      path: '/companyAgencyDashboard/role-management',
      icon: 'bi-shield-lock',
      text: 'Rol Yönetimi',
      id: 'role-management'
    });
    setMenuItems(items);
    setIsMenuLoading(false);
    return;
  }

  const rolePermissions = JSON.parse(localStorage.getItem(`rolePermissions_${company?.id}`)) || {
    muhasebe: {
      dashboard: true,
      companies: false,
      guides: false,
      tours: false,
      reports: true,
      hotels: false,
      backup: false,
      settings: false
    },
    operasyon: {
      dashboard: true,
      companies: true,
      guides: true,
      tours: true,
      reports: false,
      hotels: true,
      backup: false,
      settings: false
    }
  };

  const filteredItems = items.filter(item => {
    const permissions = rolePermissions[loggedInUser.position];
    return permissions && permissions[item.id];
  });

  setMenuItems(filteredItems);
  setIsMenuLoading(false);
}; 