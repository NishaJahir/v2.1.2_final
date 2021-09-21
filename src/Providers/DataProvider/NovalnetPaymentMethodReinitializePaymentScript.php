<?php

namespace Novalnet\Providers\DataProvider;

use Plenty\Plugin\Templates\Twig;
use Plenty\Modules\Payment\Method\Contracts\PaymentMethodRepositoryContract;
use Plenty\Modules\Payment\Method\Models\PaymentMethod;

class NovalnetPaymentMethodReinitializePaymentScript
{
  public function call(Twig $twig, $arg):string
  {
    $order = $arg[0]
    // Load the all Novalnet payment methods
    $paymentMethodRepository = pluginApp(PaymentMethodRepositoryContract::class);
    $paymentMethods          = $paymentMethodRepository->allForPlugin('plenty_novalnet');
    if(!is_null($paymentMethods))
    {
       $paymentMethodIds              = [];
        foreach ($paymentMethods as $paymentMethod) {
          if ($paymentMethod instanceof PaymentMethod) {
              $paymentMethodIds[] = $paymentMethod->id;
          }
        }
    }
    
    foreach($order['properties'] as $property) {
        if($property['typeId'] == 3)
        {
            $mopId = $property['value'];
        }
    }
    
    return $twig->render('Novalnet::NovalnetPaymentMethodReinitializePaymentScript', ['paymentMethodIds' => $paymentMethodIds, 'mopId', $mopId]);
  }
}
