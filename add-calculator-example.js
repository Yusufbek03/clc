// Example: How to add a new calculator to the system
// This file demonstrates the scalable architecture

// Example 1: Adding a new calculator programmatically
function addNewCalculator() {
    const newCalculator = {
        id: 'business',
        name: 'Бизнес-кредит',
        slug: 'biznes-kredit-kalkulyator',
        category: 'Бизнес-кредит',
        description: 'Расчет кредита для бизнеса',
        icon: '🏢',
        color: '#17a2b8',
        variables: {
            minAmount: 500000,
            maxAmount: 50000000,
            defaultAmount: 5000000,
            minRate: 8,
            maxRate: 25,
            defaultRate: 12.0
        },
        seo: {
            title: '{category} калькулятор {year} | Рассчитать бизнес-кредит',
            description: '{category} калькулятор {year} - расчет кредита для бизнеса, инвестиций и развития компании',
            h1: '{category} калькулятор',
            keywords: 'бизнес кредит калькулятор, кредит для бизнеса, инвестиционный кредит'
        }
    };

    // Add to system
    if (window.calculatorManager) {
        const success = window.calculatorManager.addCalculator(newCalculator);
        if (success) {
            console.log('Новый калькулятор добавлен:', newCalculator.name);
            // Refresh navigation
            window.calculatorManager.setupNavigation();
        }
    }
}

// Example 2: Adding calculator via admin panel
function addCalculatorViaAdmin() {
    const calculatorData = {
        id: 'leasing',
        name: 'Лизинг',
        slug: 'lizing-kalkulyator',
        category: 'Лизинг',
        description: 'Расчет лизинговых платежей',
        icon: '🚛',
        color: '#6f42c1',
        variables: {
            minAmount: 100000,
            maxAmount: 10000000,
            defaultAmount: 2000000,
            minRate: 5,
            maxRate: 20,
            defaultRate: 10.0
        },
        seo: {
            title: '{category} калькулятор {year} | Рассчитать лизинговые платежи',
            description: '{category} калькулятор {year} - расчет лизинговых платежей и условий лизинга',
            h1: '{category} калькулятор',
            keywords: 'лизинг калькулятор, лизинговые платежи, лизинг оборудования'
        }
    };

    // This would be called from admin panel
    return calculatorData;
}

// Example 3: Bulk update SEO for all calculators
function updateAllCalculatorsSEO() {
    const newSeoFormulas = {
        title: '{category} калькулятор {year} | Быстрый расчет онлайн',
        description: '{category} калькулятор {year} - профессиональный расчет кредитных условий с учетом всех параметров',
        h1: '{category} калькулятор {year}'
    };

    // Update global formulas
    if (window.calculatorManager && window.calculatorManager.seoManager) {
        window.calculatorManager.seoManager.updateGlobalFormulas(newSeoFormulas);
        console.log('SEO формулы обновлены для всех калькуляторов');
    }
}

// Example 4: Export configuration for backup
function exportConfiguration() {
    if (window.calculatorManager) {
        const config = window.calculatorManager.exportConfiguration();
        const dataStr = JSON.stringify(config, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        
        const link = document.createElement('a');
        link.href = URL.createObjectURL(dataBlob);
        link.download = `calculator-config-${new Date().toISOString().split('T')[0]}.json`;
        link.click();
        
        console.log('Конфигурация экспортирована');
    }
}

// Example 5: Import configuration
function importConfiguration(configFile) {
    const reader = new FileReader();
    reader.onload = (e) => {
        try {
            const config = JSON.parse(e.target.result);
            if (window.calculatorManager) {
                window.calculatorManager.importConfiguration(config);
                console.log('Конфигурация импортирована');
            }
        } catch (error) {
            console.error('Ошибка импорта:', error);
        }
    };
    reader.readAsText(configFile);
}

// Example 6: Generate sitemap for all calculators
function generateSitemap() {
    if (window.calculatorManager) {
        const sitemapData = window.calculatorManager.config.generateSitemapData();
        
        let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

        sitemapData.forEach(url => {
            sitemap += `
    <url>
        <loc>${url.loc}</loc>
        <lastmod>${url.lastmod}</lastmod>
        <changefreq>${url.changefreq}</changefreq>
        <priority>${url.priority}</priority>
    </url>`;
        });

        sitemap += `
</urlset>`;

        const blob = new Blob([sitemap], { type: 'application/xml' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `sitemap-${new Date().toISOString().split('T')[0]}.xml`;
        link.click();
        
        console.log('Sitemap сгенерирован');
    }
}

// Example 7: WordPress integration (if using WordPress)
function wordpressIntegration() {
    // WordPress AJAX endpoint for calculator management
    const wpAjaxUrl = '/wp-admin/admin-ajax.php';
    
    // Add calculator via WordPress
    function addCalculatorToWordPress(calculatorData) {
        const formData = new FormData();
        formData.append('action', 'add_calculator');
        formData.append('calculator_data', JSON.stringify(calculatorData));
        
        fetch(wpAjaxUrl, {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                console.log('Калькулятор добавлен в WordPress');
            }
        });
    }
    
    // Update SEO formulas via WordPress
    function updateSEOFormulasInWordPress(formulas) {
        const formData = new FormData();
        formData.append('action', 'update_seo_formulas');
        formData.append('formulas', JSON.stringify(formulas));
        
        fetch(wpAjaxUrl, {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                console.log('SEO формулы обновлены в WordPress');
            }
        });
    }
    
    return {
        addCalculator: addCalculatorToWordPress,
        updateSEO: updateSEOFormulasInWordPress
    };
}

// Example 8: CMS-agnostic API endpoints
const CalculatorAPI = {
    // Add new calculator
    addCalculator: async (calculatorData) => {
        const response = await fetch('/api/calculators', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(calculatorData)
        });
        return response.json();
    },
    
    // Update calculator
    updateCalculator: async (id, updates) => {
        const response = await fetch(`/api/calculators/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updates)
        });
        return response.json();
    },
    
    // Update global SEO
    updateGlobalSEO: async (seoData) => {
        const response = await fetch('/api/seo/global', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(seoData)
        });
        return response.json();
    },
    
    // Get all calculators
    getCalculators: async () => {
        const response = await fetch('/api/calculators');
        return response.json();
    }
};

// Export examples for use
window.CalculatorExamples = {
    addNewCalculator,
    addCalculatorViaAdmin,
    updateAllCalculatorsSEO,
    exportConfiguration,
    importConfiguration,
    generateSitemap,
    wordpressIntegration,
    CalculatorAPI
};
