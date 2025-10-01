/*
 * @Author: danteclericuzio
 * @Date: 2025-09-30 15:35:41
 * @Last Modified by: danteclericuzio
 * @Last Modified time: 2025-09-30 15:35:42
 */

import CheckCertificateValidityPage from '@/components/pages/check-certificate-validity';

export default function Hero({ params }) {
    return (
        <CheckCertificateValidityPage unique={params.unique} />
    )
}